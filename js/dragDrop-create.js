/**
 * Drag and Drop implementation using a table based layout
 */

(function(){
	/**
	 * The base object create for a drag and drop element using HTML5 drag and drop
	 * @return {Object} This is the public object which will be inherited once extended
	 */
	var Table = (function() {
		var publicObj = {};

		publicObj.$table = {};
		publicObj.rows = []
		
		return publicObj;

	}());

	/**
	 * Allows us to create an instance of our rows within the application
	 * @return {Object} This is the public object which will be inherited once extended
	 */
	var Row = (function(){
		var publicObj = {}

		publicObj.index = -1;
		publicObj.$row = {};
		publicObj.cells = [];

		return publicObj;
	}());

	/**
	 * Creates an instance of a cell
	 * @return {Object} This is the public object which will be inherited once extended
	 */
	var Cell = (function(){
		var publicObj = {}

		publicObj.index = -1;
		publicObj.$cell = {};
		publicObj.colspan = 1;

		return publicObj;
	}());

	// Create an instance for the scheduler
	var Scheduler = Object.create(Table,{ $table :{ value:$('table') }}),
		rows = Scheduler.$table.find('tbody tr');

	rows.each(function(i){
		var $row = $(this),
			newRow = Object.create(Row,{ $row :{ value:$row },index :{ value:i }});

		Scheduler.rows.push(newRow);

		console.log(newRow);

		$row.find('td').each(function(i){
			console.log($(this),newRow,i);
			//var newCell = Object.create(Cell,{ $cell :{ value:$(this) },index :{ value:i }});
			newRow.cells.push($(this));
		});
	});

	console.log(Scheduler);

	// Get all cells and make them draggable
	var cells = Scheduler.$table.find('td'),$currentDrag = null;

	for(var i=0,j=cells.length;i<j;i=i+1){
		cells[i].setAttribute('draggable',true);

		cells[i].addEventListener('dragstart', function (e) {
		  if (e.stopPropagation) e.stopPropagation(); // Have to stop the bubbling to ensure 
		  e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
	      $currentDrag = $(this);
	    });
	}

	// Add listener for drag over event
	/*Scheduler.container.addEventListener('dragover', function (e) {
	    if (e.preventDefault) e.preventDefault(); // allows us to drop
	    //$currentDrag.clone().css("opacity","0.5").insertAfter($(e.srcElement));
	    return false;
  	});

	// Add listener for drop event
  	Scheduler.container.addEventListener('drop', function (e) {
	    if (e.preventDefault) e.preventDefault(); // allows us to drop
	    
	    var dropCell = $(e.srcElement), dropRow = dropCell.parent("tr"), cols = dropRow.find("td").length;

	    console.log(cols);

	    if($currentDrag){
	    	$currentDrag.insertAfter($(e.srcElement));
		}
	    return false;
  	});*/


}());