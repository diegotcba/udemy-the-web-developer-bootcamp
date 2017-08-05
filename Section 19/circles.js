
function onKeyDown(event) {
	if(event.key === 'escape') {
		project.activeLayer.clear();
	} else if(data[event.key]) {
		data[event.key].sound.play();
		new Path.Circle(Point.random() * view.size, 500).fillColor = data[event.key].color;
	} else {
		new Path.Circle(Point.random() * view.size, 500).fillColor = 'white';
	}
}

function onFrame(event) {
	for(var i=0; i < project.activeLayer.children.length; i++) {
		var item = project.activeLayer.children[i];
		
		item.fillColor.hue += 1;
		item.scale(0.9);
		if(item.area < 1) {
			item.remove();
		}
	}
}
