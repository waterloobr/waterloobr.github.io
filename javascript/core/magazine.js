/*
 * Magazine sample
*/

function getMagazineAssetPath(path) {
	var pathname = window.location.pathname || '';
	var isPublicationPage = pathname.indexOf('/publications/') !== -1 || pathname.indexOf('publications/') !== -1;
	return (isPublicationPage ? '../' : '') + path;
}

function initializeMobileMagazineFallback(config) {
	if (!window.matchMedia || !window.matchMedia('(max-width: 767px)').matches) {
		return false;
	}

	var viewport = $('.magazine-viewport');
	var container = viewport.find('.container').first();
	var pageCount = Number(config.pages || 0);
	var folderName = config.folderName;
	var pdfPath = config.pdfPath;

	if (!viewport.length || !container.length || !folderName || !pageCount) {
		return false;
	}

	viewport.addClass('magazine-viewport--mobile');
	container.empty();

	var fallback = $('<div />', { 'class': 'mobile-magazine-fallback' });
	var header = $('<div />', { 'class': 'mobile-magazine-fallback__header' });
	var title = $('<div />', { 'class': 'mobile-magazine-fallback__title' }).text(config.title || folderName);
	var summary = $('<p />', { 'class': 'mobile-magazine-fallback__summary' }).text('Swipe vertically to read the issue on mobile.');

	header.append(title).append(summary);

	if (pdfPath) {
		$('<a />', {
			'class': 'mobile-magazine-fallback__download',
			'href': pdfPath,
			'target': '_blank',
			'rel': 'noopener noreferrer'
		}).text('Open PDF').appendTo(header);
	}

	fallback.append(header);

	for (var page = 1; page <= pageCount; page++) {
		(function(pageNumber) {
			var figure = $('<figure />', { 'class': 'mobile-magazine-fallback__page' });
			var img = $('<img />', {
				'alt': folderName + ' page ' + pageNumber,
				'loading': pageNumber <= 2 ? 'eager' : 'lazy',
				'decoding': 'async'
			});

			var basePath = getMagazineAssetPath('images/medium/' + folderName + '/' + pageNumber);
			var jpgPath = basePath + '.jpg';
			var pngPath = basePath + '.png';

			img.on('error', function() {
				if (this.src.indexOf('.jpg') !== -1) {
					this.src = pngPath;
				} else {
					figure.remove();
				}
			});

			img.attr('src', jpgPath);
			figure.append(img);
			fallback.append(figure);
		})(page);
	}

	container.append(fallback);
	$('.thumbnails, .next-button, .previous-button').hide();
	$('body').addClass('has-mobile-magazine');
	return true;
}

function addPage(page, book, folderName) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element, folderName);
	}

}

function loadPage(page, pageElement, folderName) {
    // Try loading .jpg first, then .png if not found
    const basePath = getMagazineAssetPath('images/medium/' + folderName + '/' + page);
    const jpgPath = basePath + '.jpg';
    const pngPath = basePath + '.png';

    const img = $('<img />');

    img.mousedown(function(e) {
        e.preventDefault();
    });

    img.load(function() {
        $(this).css({width: '100%', height: '100%'});
        $(this).appendTo(pageElement);
        pageElement.find('.loader').remove();
    });

    // First, try loading the JPG
    $.ajax({
        url: jpgPath,
        type: 'HEAD',
        success: function() {
            img.attr('src', jpgPath);
        },
        error: function() {
            // If JPG doesn't exist, try PNG
            img.attr('src', pngPath);
        }
    });

    loadRegions(page, pageElement);
}


// Load regions

function loadRegions(page, element) {

	$.getJSON(getMagazineAssetPath('regions/'+page+'-regions.json')).
		done(function(data) {

			$.each(data, function(key, region) {
				addRegion(region, element);
			});
		});
}

// Add region

function addRegion(region, pageElement) {
	
	var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = options.width/2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y/pageHeight*100)+'%',
		left: Math.round(region.x/pageWidth*100)+'%',
		width: Math.round(region.width/pageWidth*100)+'%',
		height: Math.round(region.height/pageHeight*100)+'%'
	}).attr('region-data', $.param(region.data||''));


	reg.appendTo(pageElement);
}

function regionClick(event) {

	var region = $(event.target);
	if (region.hasClass('region')) {
		
		var regionType = $.trim(region.attr('class').replace('region', ''));

		return processRegion(region, regionType);
	}

}

function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link' :

			window.open(data.url);

		break;
		case 'zoom' :

			var regionOffset = region.offset(),
				viewportOffset = $('.magazine-viewport').offset(),
				pos = {
					x: regionOffset.left-viewportOffset.left,
					y: regionOffset.top-viewportOffset.top
				};

			$('.magazine-viewport').zoom('zoomIn', pos);

		break;
		case 'to-page' :

			$('.magazine').turn('page', data.page);

		break;
	}

}

// Load large page

function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	img.attr('src', getMagazineAssetPath('images/large/' +  page + '.jpg'));
}

// Load small page

function loadSmallPage(page, pageElement, folderName) {
	
	var img = pageElement.find('img');
	var basePath = getMagazineAssetPath('images/medium/' + folderName + '/' + page);
	var jpgPath = basePath + '.jpg';
	var pngPath = basePath + '.png';

	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page

	$.ajax({
		url: jpgPath,
		type: 'HEAD',
		success: function() {
			img.attr('src', jpgPath);
		},
		error: function() {
			img.attr('src', pngPath);
		}
	});
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.magazine').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).
	zoom('resize');


	if ($('.magazine').turn('zoom')==1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width, width),
			boundHeight: Math.min(options.height, height)
		});

		if (bound.width%2!==0)
			bound.width-=1;

			
		if (bound.width!=$('.magazine').width() || bound.height!=$('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page')==1)
				$('.magazine').turn('peel', 'br');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		$('.magazine').css({top: -bound.height/2, left: -bound.width/2});
	}

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');
	
}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {
	
	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		
		}
	}
		
	return bound;
}
