import { Subject, BehaviorSubject } from 'rxjs';
import { ActionTypes } from './actions';
import { ProductsModel } from '../model/product.model';

interface InitialState {
    products: Array<product>;
}
interface product {
    pid: string,
    product_name: string,
    product_weight: string,
    product_price: number,
    product_image: string
}
let state: InitialState = {
    products: [],
};

interface Event {
    type: String;
    payload?: any;
}

export const productStore = new BehaviorSubject<InitialState>({
    products: new ProductsModel().data,
});
export const productEventDispatcher = new Subject<Event>();

productEventDispatcher.subscribe((data: Event) => {
    switch (data.type) {
        case ActionTypes.GET_PRODUCT:
            productStore.next(state);
            break;

        case ActionTypes.ADD_PRODUCT:
            state = {
                ...state,
                products: data.payload
            };
            productStore.next(state);
            break;
        default:
            break;
    }
});
