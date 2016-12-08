export function render(el, state) {
	// console.log('items', items, state.items);
	el.innerHTML = renderApp(
			renderForm(),
			renderError(state.error),
			renderItems(state.items)
		);
	
}

function renderApp(...elements){
	return `<div id="app" class="container">
				${elements.join('')}
			</div>`;
};

function renderForm() {
    return `<div class="panel">
				<div class="panel-body">
					<div class="input-group margin-bottom-sm">
						<form id="request-form">
							<div class="col-lg-5">
								<input type="text" class="form-control" name="start" id="start" placeholder="Start">
							</div>
							<div class="col-lg-5">
								<input type="text" class="form-control" name="destination" id="destination" placeholder="Destination">
							</div>
							<div class="col-lg-2">
								<button id="estimatePrices" class="btn btn-default btn-sm">Get Price</button>
							</div>
						</form>
					</div>
				</div>
			</div>`;
}

function renderItems(items) {
	if (!items.length) {
		return '';
	}
	items = items.map(renderItem).join('');
    return `<div class="panel panel-default">
				<div class="panel-heading">Items</div>
				<div class="panel-body">
					<ul class="list-group">${items}</ul>
				</div>
			</div>`;
}

function renderItem(item) {
    return `<li class="list-group-item">
				Provider: ${item.display_name}<br>
				Estimate: ${item.estimate}
			</li>`;
}

function renderError(error) {
	if (!error) {
		return '';
	}
	return `<div class="alert alert-danger" role="alert">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				${error}
			</div>`;
}