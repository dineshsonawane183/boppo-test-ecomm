import { Subject, BehaviorSubject } from 'rxjs';
import { ActionTypes } from './actions';

interface InitialState {
    carts: Array<cart>
}
interface cart {
    pid: string,
    name: string,
    product_weight: string,
    price: number,
    qty: number,
    product_image: string
}
let state: InitialState = {
    carts: []
};

interface Event {
    type: String;
    payload?: any;
}

export const cartStore = new BehaviorSubject<InitialState>({
    carts: []
});
export const cartEventDispatcher = new Subject<Event>();

cartEventDispatcher.subscribe((data: Event) => {
    switch (data.type) {
        case ActionTypes.GET_CART:
            cartStore.next(state);
            break;

        case ActionTypes.ADD_CART:
            state = {
                ...state,
                carts: data.payload
            };
            cartStore.next(state);
            break;
        default:
            break;
    }
});
