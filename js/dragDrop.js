/**
 * Drag and Drop implementation using a table based layout
 * Note: Had started to use Object.create but was getting weird issues when adding cells to rows because it wasn't maintaining the correct context
 */

(function(){
	/**
	 * The base object create for a drag and drop element using HTML5 drag and drop
	 * @return {Object} This is the public object which will be inherited once extended
	 */
	var Table = (function($table) {
		var publicObj = {};
		var $table = publicObj.$table = $table;
		var cells = publicObj.cells = []
		var dragging = publicObj.dragging = null
		
		return publicObj;

	});

	/**
	 * Creates an instance of a cell
	 * @return {Object} This is the public object which will be inherited once extended
	 */
	var Cell = (function($cell){
		var publicObj = {}

		// Constructor
		// Make all cells draggable
		$cell.attr('draggable',true);

		// Bind the many events required
		$cell.on('mouseenter',function(e){
			$cell.addClass('hover');
		}).on('mouseleave',function(e){
			$cell.removeClass('hover');
		}).on('dragstart',function(e){
			e.stopPropagation();
			Scheduler.dragging = publicObj;
			e.originalEvent.dataTransfer.setData('Text', this.id); // Required for dragging in Firefox
		}).on('dragenter',function(e){
			e.stopPropagation();
        	e.preventDefault();
		}).on('dragover',function(e){
			e.stopPropagation();
        	e.preventDefault();
		}).on('drop',function(e){
			e.stopPropagation();
        	e.preventDefault();

        	if(Scheduler.dragging){
				
				var dragging = Scheduler.dragging, 
					dragCell = dragging.$cell,
					dragIndex = dragCell[0].cellIndex,
					dropIndex = $cell[0].cellIndex,
					dragGap = dragIndex - dropIndex;

				// TODO: Look at refactoring this, should be a simpler way of doing this. And make this a private method to allow other ways of reordering
				if(dragIndex > dropIndex)
				{
					var insertAt = $cell.next(); // Get the position we want to insert

					// if we are trying to insert the object after the drag object DON'T use the drop position
					if(insertAt[0] === dragCell[0])
					{
						insertAt = $cell;
					}

					// Perform the insert
					$cell.insertBefore(dragCell);
					dragCell.insertBefore(insertAt);
				}
				else
				{
					var insertAt = $cell.prev(); // Get the position we want to insert

					// if we are trying to insert the object after the drag object DON'T use the drop position
					if(insertAt[0] === dragCell[0])
					{
						insertAt = $cell;
					}
					
					// Perform the insert
					$cell.insertAfter(dragCell);
					dragCell.insertAfter(insertAt);
				}

				Scheduler.dragging = null; // reset the dragging object
			}
			
		});

		publicObj.$cell = $cell;
		return publicObj;
	});

	// Create an instance for the scheduler
	var Scheduler = new Table($('table:eq(0)')),
		cells = Scheduler.$table.find('tbody td');

	// Create cell instances
	cells.each(function(i){
		var newCell = new Cell($(this));
		Scheduler.cells.push(newCell);
	});


}());