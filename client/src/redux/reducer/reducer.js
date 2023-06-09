import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT_BY_ID,
	CLEAN_DETAIL,
	ADD_CART,
	UPDATE_CART,
	FILTER_NAME_PRODUCT,
	FILTER_PRICE_PRODUCT,
	STATE_LOGIN,
	GET_CLIENT_DATA,
	SET_PAGE,
	GET_CLIENT_ORDERS,
	GET_ORDER_BY_ID,
	GET_CUSTOMER_COMMENTS,
	CREATE_ORDER,
	DROP_PRODUCT,
	DELETE_ORDER,
	GET_CLIENT_REVIEWS,
	UPDATE_REVIEW,
	VALIDATE_LOGIN,
	ORDER_FILTER,
	SET_PRODUCT_SEARCH,
	CREATE_FAVORITE,
	GET_CLIENT_FAVORITE,
	LOGOUT,
	LOGIN,
	DELETE_FAVORITE,
	GET_PRODUCT_REVIEWS,
	GET_ALL_CLIENTS,
	DELETE_CLIENT,
	SET_CREATED_ORDER_ID,
	CLEAN_CART,
	GET_MP_LINK,
	GET_REVIEWS,
	CHANGE_LABEL,
	UPDATE_ADDRESS,
	CLEAN_ADDRESS,
	GET_ORDERS,
	GET_PAGE_REVIEWS,
	GET_CLIENT_PAGE_REVIEW,
	GET_ALL_ADMIN_CLIENTS,
	GET_ALL_PRODUCTS_CLIENTS,
	DELETE_PRODUCT_ADMIN,
	VALIDATE_ADMIN_LOGIN,
	ADMIN_LOG_OUT,
  UPDATE_PRODUCT,
} from "../actions/Types/Types";
const carritoa = JSON.parse(localStorage.getItem("carrito")) || [];
const productsa = JSON.parse(localStorage.getItem("products")) || [];
const address = localStorage.getItem("address") || "";

const initialState = {
	products: [],
	filteredProducts: [],
	product: productsa,
	cart: carritoa,
	customerComments: [],
	currentPage: 0,
	itemsPerPage: 1,
	allOrders: [],
	orders: [],
	order: {},
	success: {},
	user: {},
	clientOrders: [],
	orderDelete: [],
	reviews: [],
	favorites: [],
	deleteFavorite: [],
	isAuthenticated: false,
	productReviews: [],
	allClients: [],
	deletedClient: "",
	MPLink: "",
	allReviews: [],
	pageReviews: [],
	clientPageReview: {},
	labels: {
		Graph: false,
		Clients: false,
		Products: false,
		Reviews: false,
		Orders: false,
	},
	address: address,
	clientsAdmin: [],
	productsAdmin: [],
	deleteProduct: [],
	admin: {},
  updatedProduct : ''
	// createdOrderId: null,
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CLIENT_DATA:
			return {
				...state,
				user: action.payload,
			};
		case GET_CLIENT_DATA:
			return {
				...state,
				user: {},
			};

		case GET_CLIENT_REVIEWS:
			return {
				...state,
				reviews: [...action.payload],
			};
		case GET_ALL_PRODUCTS:
			// localStorage.setItem("products", JSON.stringify([...action.payload]));
			return {
				...state,
				products: [...action.payload],
				filteredProducts: [...action.payload],
			};
		case GET_PRODUCT_BY_ID:
			return { ...state, product: [action.payload] };

		case VALIDATE_LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case LOGIN:
			return {
				...state,
				isAuthenticated: true,
				// Reset other relevant authentication state properties upon logout
			};
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: {},
				// Reset other relevant authentication state properties upon logout
			};
		// Other authentication-related action cases

		case CLEAN_DETAIL:
			return { ...state, product: [] };

		case FILTER_NAME_PRODUCT:
			const filterProducts = state.products.filter((product) => {
				const productName = product.nombre.toLowerCase();
				if (action.payload === "") return state.products;
				return productName.includes(action.payload.toLowerCase());
			});
			return { ...state, products: filterProducts };

		case ADD_CART:
			if (!state.cart.find((product) => product.id === action.payload.id)) {
				return {
					...state,
					cart: [
						...state.cart,
						{
							id: action.payload.id,
							nombre: action.payload.nombre,
							descripcion: action.payload.descripcion,
							precio: action.payload.precio,
							cantidad: action.quantity,
							importe: action.payload.precio * action.quantity,
							imagen: action.payload.imagen,
						},
					],
				};
			} else {
				throw Error("You product is already in Cart!");
			}

		case UPDATE_CART:
			return { ...state, cart: action.payload };
		case CLEAN_CART:
			return {
				...state,
				cart: [...action.payload],
			};
		case DROP_PRODUCT:
			return {
				...state,
				cart: [
					...state.cart.filter(
						(product) => Number(product.id) !== Number(action.payload)
					),
				],
			};

		case GET_CUSTOMER_COMMENTS:
			return { ...state, customerComments: [action.payload] };

		case SET_PAGE:
			return { ...state, currentPage: [action.payload] };
		case CREATE_ORDER:
			return { ...state, success: action.payload };
		case GET_ORDER_BY_ID:
			return { ...state, order: [action.payload] };
		case GET_ORDERS:
			return {
				...state,
				allOrders: [...action.payload],
			};

		case GET_CLIENT_ORDERS:
			return { ...state, clientOrders: action.payload };

		case DELETE_ORDER:
			// const orderId = action.payload;
			// const updatedOrders =
			return {
				...state,
				clientOrders: [
					...state.clientOrders.filter((order) => order.id !== action.payload),
				],
				orderDelete: [action.payload],
			};
		case UPDATE_REVIEW:
			const { id, titulo, descripcion } = action.payload;
			const fecha = new Date().toISOString().slice(0, 10);
			const updatedReviews = state.reviews.map((review) => {
				if (review.id === id) {
					return {
						...review,
						titulo,
						descripcion,
						fecha,
					};
				}
				return review;
			});
			return {
				...state,
				reviews: updatedReviews,
			};
		case ORDER_FILTER:
			return {
				...state,
				products: [...action.payload],
			};
		case SET_PRODUCT_SEARCH:
			return {
				...state,
				products: action.payload,
			};
		case CREATE_FAVORITE:
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			};
		case DELETE_FAVORITE:
			const filtered = state.favorites.filter(
				(favorite) => favorite.id !== action.payload
			);
			return {
				...state,
				favorites: [...filtered],
				deleteFavorite: [action.payload],
			};
		case GET_CLIENT_FAVORITE:
			return {
				...state,
				favorites: [...action.payload],
			};
		case GET_PRODUCT_REVIEWS:
			return {
				...state,
				productReviews: [...action.payload],
			};
		case GET_ALL_CLIENTS:
			return {
				...state,
				allClients: [...action.payload],
			};
		case DELETE_CLIENT:
			return {
				...state,
				deletedClient: action.payload,
			};
		case GET_MP_LINK:
			return {
				...state,
				MPLink: action.payload,
			};
		case GET_REVIEWS:
			return {
				...state,
				allReviews: [...action.payload],
			};
		case GET_PAGE_REVIEWS:
			return {
				...state,
				pageReviews: [...action.payload],
			};
		case GET_CLIENT_PAGE_REVIEW:
			return {
				...state,
				clientPageReview: action.payload,
			};
		case UPDATE_ADDRESS:
			localStorage.setItem("address", action.payload);
			return {
				...state,
				address: action.payload,
			};
		case CLEAN_ADDRESS:
			localStorage.removeItem("address");
			return {
				...state,
				address: "",
			};
		// case SET_CREATED_ORDER_ID:
		//   return {
		//     ...state,
		//     createdOrderId: action.payload,
		//   };
		case CHANGE_LABEL:
			return {
				...state,
				labels: {
					Graph: false,
					Clients: false,
					Products: false,
					Reviews: false,
					Orders: false,
					[action.payload]: true,
				},
			};
		case GET_ALL_ADMIN_CLIENTS:
			return {
				...state,
				clientsAdmin: action.payload,
			};
		case GET_ALL_PRODUCTS_CLIENTS:
			return {
				...state,
				productsAdmin: action.payload,
			};
		case DELETE_PRODUCT_ADMIN:
			return {
				...state,
				deleteProduct: action.payload,
			};
		case VALIDATE_ADMIN_LOGIN:
			return {
				...state,
				admin: action.payload,
			};
		case ADMIN_LOG_OUT:
			return {
				...state,
				admin: "",
			};
		case UPDATE_PRODUCT:
			return { ...state, updatedProduct: action.payload };
		default:
			return { ...state };
	}
}
