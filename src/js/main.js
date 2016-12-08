import '../css/main.css';

import {store} from './store';
import {render} from './view';
import {registerEventHandlers} from './events';

store.subscribe(() => render(document.body, store.getState()));

render(document.body, store.getState());
registerEventHandlers();
