(function () {
    var components = window.__CS_COMPONENTS__ || [];
    var componentsById = {};
    for (var i = 0; i < components.length; i++) {
        componentsById[components[i].domId] = components[i];
    }

    var viewport = document.getElementById('cs-viewport');
    var panZoom = document.getElementById('cs-pan-zoom');
    var panel = document.getElementById('cs-panel');
    var panelContent = document.getElementById('cs-panel-content');
    var panelClose = document.getElementById('cs-panel-close');
    var zoomInBtn = document.getElementById('cs-zoom-in');
    var zoomOutBtn = document.getElementById('cs-zoom-out');
    var zoomFitBtn = document.getElementById('cs-zoom-fit');

    var scale = 1;
    var translate = { x: 0, y: 0 };
    var selectedEl = null;

    function applyTransform() {
        panZoom.style.transform =
            'translate(' + translate.x + 'px, ' + translate.y + 'px) scale(' + scale + ')';
    }
    applyTransform();

    /* The embedded SVG's own width/height attributes are scaled up from its
       viewBox (drawing coordinates are in mm), so a plain CSS outline drawn on
       a .cs-component <g> would get multiplied by that internal scale on top
       of our own pan/zoom scale() transform - and CSS outline-width also gets
       silently rounded to whole device pixels before that multiplication, so
       shrinking it in local units doesn't survive either. Instead, highlights
       are drawn as SVG <rect> children of the target group using
       vector-effect="non-scaling-stroke", which renders stroke-width in true
       screen pixels regardless of any ancestor transform or scale. */
    var svgInternalScale = 1;
    (function computeSvgInternalScale() {
        var svg = panZoom.querySelector('svg');
        if (!svg) return;
        var viewBoxWidth = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width;
        var attrWidth = parseFloat(svg.getAttribute('width'));
        if (viewBoxWidth && attrWidth) {
            svgInternalScale = attrWidth / viewBoxWidth;
        }
    })();

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var HIGHLIGHT_GAP_PX = 2;

    function makeHighlightRect(color) {
        var rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', color);
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('vector-effect', 'non-scaling-stroke');
        rect.style.pointerEvents = 'none';
        return rect;
    }

    var selectedHighlight = makeHighlightRect('#ff5722');
    var hoverHighlight = makeHighlightRect('#2196f3');

    var NET_HIGHLIGHT_CLASS = 'cs-net-highlighted';
    var highlightedNetEls = [];

    function clearNetHighlight() {
        for (var i = 0; i < highlightedNetEls.length; i++) {
            highlightedNetEls[i].classList.remove(NET_HIGHLIGHT_CLASS);
        }
        highlightedNetEls = [];
    }

    function highlightNet(netKey) {
        clearNetHighlight();
        if (!netKey) return;
        var matches = panZoom.querySelectorAll('.wires-highlight [data-net="' + CSS.escape(netKey) + '"]');
        for (var i = 0; i < matches.length; i++) {
            matches[i].classList.add(NET_HIGHLIGHT_CLASS);
            highlightedNetEls.push(matches[i]);
        }
    }

    /* Mirrors sanitizeDomId() in src/utils.ts - there is no shared source of
       truth between the TS and JS copies, so keep this regex in sync if that
       function changes. */
    function sanitizeNetKey(name) {
        return String(name).replace(/[^A-Za-z0-9_-]/g, '-');
    }
    function sheetIndexFromDomId(domId) {
        var m = /^comp-(\d+)-/.exec(domId || '');
        return m ? m[1] : '0';
    }
    function buildNetKey(sheetIndex, rawNetName) {
        return sheetIndex + '-' + sanitizeNetKey(rawNetName);
    }

    /* A component's own geometry never changes, so its bbox is cached after
       the first measurement rather than re-measured via getBBox() on every
       reposition (e.g. each zoom tick). This also sidesteps a feedback loop:
       once a highlight rect is attached as a child of the target, it becomes
       part of that target's own bbox, so re-measuring live would make the
       rect grow a little on every subsequent reposition - and the hover and
       selected rects can both be attached to the same target at once, so
       even detaching just the one being repositioned isn't enough. */
    var bboxCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

    function getCleanBBox(targetEl) {
        if (bboxCache && bboxCache.has(targetEl)) {
            return bboxCache.get(targetEl);
        }
        var reattachSelected = selectedHighlight.parentNode === targetEl;
        var reattachHover = hoverHighlight.parentNode === targetEl;
        if (reattachSelected) targetEl.removeChild(selectedHighlight);
        if (reattachHover) targetEl.removeChild(hoverHighlight);

        var raw = targetEl.getBBox();
        var bbox = { x: raw.x, y: raw.y, width: raw.width, height: raw.height };

        if (reattachSelected) targetEl.appendChild(selectedHighlight);
        if (reattachHover) targetEl.appendChild(hoverHighlight);

        if (bboxCache) bboxCache.set(targetEl, bbox);
        return bbox;
    }

    function positionHighlight(rect, targetEl) {
        var bbox = getCleanBBox(targetEl);
        var totalScale = svgInternalScale * scale;
        var gap = totalScale > 0 ? (HIGHLIGHT_GAP_PX / totalScale) : HIGHLIGHT_GAP_PX;
        rect.setAttribute('x', bbox.x - gap);
        rect.setAttribute('y', bbox.y - gap);
        rect.setAttribute('width', bbox.width + gap * 2);
        rect.setAttribute('height', bbox.height + gap * 2);
        if (rect.parentNode !== targetEl) {
            targetEl.appendChild(rect);
        }
    }

    function removeHighlight(rect) {
        if (rect.parentNode) {
            rect.parentNode.removeChild(rect);
        }
    }

    /* The highlight's gap is expressed in the target's local (SVG) units so it
       stays a constant size on screen - recompute it whenever the zoom level
       changes so already-shown highlights don't drift out of proportion. */
    function refreshHighlightPositions() {
        if (selectedHighlight.parentNode) {
            positionHighlight(selectedHighlight, selectedHighlight.parentNode);
        }
        if (hoverHighlight.parentNode) {
            positionHighlight(hoverHighlight, hoverHighlight.parentNode);
        }
    }

    var dragging = false;
    var dragStart = { x: 0, y: 0 };
    var translateStart = { x: 0, y: 0 };

    /* Pointer capture is deliberately not used here: capturing the pointer on
       'viewport' also retargets the resulting 'click' event to the captured
       element, which breaks click-to-select on the actual component under the
       cursor. Tracking move/up on 'document' instead handles drags that leave
       the viewport bounds (e.g. over the side panel) without that side effect. */
    viewport.addEventListener('pointerdown', function (event) {
        dragging = true;
        viewport.classList.add('cs-dragging');
        dragStart.x = event.clientX;
        dragStart.y = event.clientY;
        translateStart.x = translate.x;
        translateStart.y = translate.y;
    });

    document.addEventListener('pointermove', function (event) {
        if (!dragging) return;
        translate.x = translateStart.x + (event.clientX - dragStart.x);
        translate.y = translateStart.y + (event.clientY - dragStart.y);
        applyTransform();
    });

    function endDrag(event) {
        dragging = false;
        viewport.classList.remove('cs-dragging');
    }
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);

    function zoomBy(factor, centerPoint) {
        var newScale = scale * factor;
        newScale = Math.min(10, Math.max(0.1, newScale));

        translate.x = centerPoint.x - (centerPoint.x - translate.x) * (newScale / scale);
        translate.y = centerPoint.y - (centerPoint.y - translate.y) * (newScale / scale);
        scale = newScale;

        applyTransform();
        refreshHighlightPositions();
    }

    viewport.addEventListener('wheel', function (event) {
        event.preventDefault();

        var rect = viewport.getBoundingClientRect();
        var cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };

        var zoomFactor = Math.exp(-event.deltaY * 0.001);
        zoomBy(zoomFactor, cursor);
    }, { passive: false });

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function () {
            var rect = viewport.getBoundingClientRect();
            zoomBy(1.2, { x: rect.width / 2, y: rect.height / 2 });
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function () {
            var rect = viewport.getBoundingClientRect();
            zoomBy(1 / 1.2, { x: rect.width / 2, y: rect.height / 2 });
        });
    }

    function fitToView() {
        var svg = panZoom.querySelector('svg');
        if (!svg) return;

        var bbox = svg.getBBox();
        var contentWidth = bbox.width * svgInternalScale;
        var contentHeight = bbox.height * svgInternalScale;
        var contentX = bbox.x * svgInternalScale;
        var contentY = bbox.y * svgInternalScale;

        if (contentWidth <= 0 || contentHeight <= 0) {
            scale = 1;
            translate = { x: 0, y: 0 };
            applyTransform();
            refreshHighlightPositions();
            return;
        }

        var vrect = viewport.getBoundingClientRect();
        var fitScale = Math.min(vrect.width / contentWidth, vrect.height / contentHeight) * 0.9;

        if (!isFinite(fitScale) || fitScale <= 0) {
            scale = 1;
            translate = { x: 0, y: 0 };
            applyTransform();
            refreshHighlightPositions();
            return;
        }

        fitScale = Math.min(10, Math.max(0.1, fitScale));

        translate.x = vrect.width / 2 - (contentX + contentWidth / 2) * fitScale;
        translate.y = vrect.height / 2 - (contentY + contentHeight / 2) * fitScale;
        scale = fitScale;

        applyTransform();
        refreshHighlightPositions();
    }

    if (zoomFitBtn) {
        zoomFitBtn.addEventListener('click', function () {
            fitToView();
        });
    }

    panZoom.addEventListener('pointerover', function (event) {
        var target = event.target.closest ? event.target.closest('.cs-component') : null;
        if (!target) {
            removeHighlight(hoverHighlight);
            return;
        }
        positionHighlight(hoverHighlight, target);
    });

    panZoom.addEventListener('pointerout', function (event) {
        var related = event.relatedTarget && event.relatedTarget.closest
            ? event.relatedTarget.closest('.cs-component') : null;
        if (!related) {
            removeHighlight(hoverHighlight);
        }
    });

    function formatPinType(name) {
        switch (name) {
            case 'passive':
                return 'Passive';
            case 'any':
                return 'Any';

            case 'input':
                return 'Input';
            case 'output':
                return 'Output';
            case 'io':
                return 'IO';

            case 'hiz':
                return 'High impedance';
            case 'open_collector':
                return 'Open collector';
            case 'open_emitter':
                return 'Open emitter';

            case 'power':
                return 'Power';
            case 'power_reference':
                return 'Power reference';
            case 'power_input':
                return 'Power input';
            case 'power_output':
                return 'Power output';

            case 'no_connect':
                return 'No connect';
            case 'bus':
                return 'Bus';
        }
    }

    function renderPanel(meta) {
        clearNetHighlight();

        var html = '';
        var sheetIndex = sheetIndexFromDomId(meta.domId);

        let displayName = meta.refDes || meta.instanceName;
        if (meta.type === "net") {
            /* find the net name */
            let netNameItem = meta.params.find(item => item.key === 'net_name');
            displayName = "Net: " + netNameItem.value;
        } else if (meta.type === "graphic"){
            displayName = 'Graphic';
        }

        if (meta.type === "net") {
            let netNameItem = meta.params.find(item => item.key === 'net_name');
            html += '<h2><span class="cs-net-link" data-net-name="' + escapeHtml(netNameItem.value) +
                '" data-sheet-index="' + sheetIndex + '">' + escapeHtml(displayName) + '</span></h2>';
        } else {
            html += '<h2>' + escapeHtml(displayName) + '</h2>';
        }
        html += '<p class="instance-name">ID: ' + escapeHtml(meta.instanceName) + '</p>';

        html += '<h3>Pins</h3>';
        html += '<table><thead><tr><th>ID</th><th>Name</th><th>Pin Type</th><th>Net</th></tr></thead><tbody>';
        for (var i = 0; i < meta.pins.length; i++) {
            var pin = meta.pins[i];
            var netCell = pin.netName === null || pin.netName === undefined
                ? '<td></td>'
                : '<td class="cs-net-link" data-net-name="' + escapeHtml(pin.netName) +
                  '" data-sheet-index="' + sheetIndex + '">' + escapeHtml(pin.netName) + '</td>';
            html += '<tr><td>' + escapeHtml(pin.id) + '</td><td>' + escapeHtml(pin.name) +
                '</td><td>' + escapeHtml(formatPinType(pin.type)) +
                '</td>' + netCell + '</tr>';
        }
        html += '</tbody></table>';

        html += '<h3>Parameters</h3>';
        html += '<table class="parameters"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';
        for (var j = 0; j < meta.params.length; j++) {
            var param = meta.params[j];
            html += '<tr><td>' + escapeHtml(param.key) + '</td><td>' + escapeHtml(param.value) + '</td></tr>';
        }
        html += '</tbody></table>';

        panelContent.innerHTML = html;
    }

    function escapeHtml(value) {
        var div = document.createElement('div');
        div.textContent = value === null || value === undefined ? '' : String(value);
        return div.innerHTML;
    }

    function deselect() {
        clearNetHighlight();
        if (selectedEl) {
            removeHighlight(selectedHighlight);
            selectedEl = null;
        }
        panel.classList.add('cs-hidden');
    }

    viewport.addEventListener('click', function (event) {
        if (Math.abs(event.clientX - dragStart.x) > 3 || Math.abs(event.clientY - dragStart.y) > 3) {
            return;
        }

        var target = event.target.closest ? event.target.closest('.cs-component') : null;
        if (!target) {
            deselect();
            return;
        }

        var meta = componentsById[target.id];
        if (!meta) {
            deselect();
            return;
        }

        selectedEl = target;
        positionHighlight(selectedHighlight, selectedEl);

        renderPanel(meta);
        panel.classList.remove('cs-hidden');
    });

    panelClose.addEventListener('click', function () {
        deselect();
    });

    panelContent.addEventListener('click', function (event) {
        var target = event.target.closest ? event.target.closest('.cs-net-link') : null;
        if (!target) return;
        var netName = target.getAttribute('data-net-name');
        var sheetIndex = target.getAttribute('data-sheet-index') || '0';
        if (!netName) return;
        highlightNet(buildNetKey(sheetIndex, netName));
    });
})();
