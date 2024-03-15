export const ROUTES = {
    USER: {
        HOME_PAGE: "/",
        PRODUCT: "/products",
        PRODUCT_DETAIL: "/products/:id",
        CART: "/cart",
        CHECKOUT: "/checkout",
        ABOUT: "/about",
        CONTACT: "/contact",
        PROFILE: "/profile",
        USER_INFO: "/profile/user-info",
        ORDER_HISTORY: "/profile/order-history",
        FAVORITE_PRODUCTS: "/profile/favorite-products",
        CHANGE_PASSWORD: "/profile/change-password",
    },
    LOGIN: "/login",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        ORDER_MANAGE: "/admin/dashboard/order",
        CREATE_PRODUCT: "/admin/products/create",
        UPDATE_PRODUCT: "/admin/products/:id/update",
        USER_MANAGE: "/admin/users",
    }
}