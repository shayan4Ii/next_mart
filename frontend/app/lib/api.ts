// Get CSRF token from Django
async function getCSRFToken() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf/`, {
        method: "GET",
        credentials: "include",
    });
    

}

// Get a specific cookie value from the browser
function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) {
        return parts[1].split(";")[0];
    }

    return "";
}


// Register a new user
async function signup_api(username: string, email: string, password: string) {
    try {
        await getCSRFToken();
        const csrftoken = getCookie("csrftoken");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                signupusername: username,
                email: email,
                signuppassword: password,
            }),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Signup error:", error);
        throw error;
    }
}


// Login existing user
async function login_api(username: string, password: string) {
    try {
        await getCSRFToken();
        const csrftoken = getCookie("csrftoken");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Login error:", error);
        throw error;
    }
}


// Logout current user
async function logout() {
    try {
        const csrftoken = getCookie("csrftoken");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": csrftoken,
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Logout error:", error);
        throw error;
    }
}


// Product data structure
interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    image: string | null;
    created_at: string;
}

interface CartItem {
    id: number;
    product: number;
    product_name: string;
    product_price: string;
    product_image: string | null;
    quantity: number;
    subtotal: string;
}

// Fetch all products from backend
async function get_products_api() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await response.json();

        return {
            status: response.status,
            data: data,
        };

    } catch (error) {
        console.log("Products fetch error:", error);

        return {
            status: 500,
            data: [],
        };
    }
}


// Convert Django media path into a complete image URL
function resolveImageUrl(path: string | null) {
    if (!path) {
        return null;
    }

    return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}


// Format price for display
function formatPrice(price: string) {
    const number = Number(price);

    if (isNaN(number)) {
        return price;
    }

    return "$" + number.toFixed(2);
}

async function home_api() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/`, {
        credentials: "include",
    });

    return response;
}

async function change_password_api(oldpassword: string, newpassword: string) {
    await getCSRFToken();
    const csrftoken = getCookie("csrftoken");
    const response = await(fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/change_password/`, {
        method:"POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
             "X-CSRFToken": csrftoken,

        },
        body: JSON.stringify({
            oldpassword,
            newpassword,

        }),
    })

    );
    const data = await response.json();
    console.log("your data: ", data)
    return data;
}

async function add_to_cart_api(product_id: number) {
    try {
        await getCSRFToken();
        const csrftoken = getCookie("csrftoken");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add/`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                    product_id,
                }),
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {
        console.log("Add to cart error:", error);
        throw error;
    }
}

async function get_cart_api() {
    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/`,
            {
                method: "GET",
                credentials: "include",
            }
        );


        const data = await response.json();

        return data;


    } catch (error) {

        console.log("Cart fetch error:", error);

        return [];

    }
}
async function delete_cart_item_api(id: number) {

    try {

        await getCSRFToken();

        const csrftoken = getCookie("csrftoken");


        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/delete/${id}/`,
            {
                method: "DELETE",

                credentials: "include",

                headers: {
                    "X-CSRFToken": csrftoken || "",
                },
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to delete cart item"
            );

        }


        return data;


    } catch (error) {

        console.error(
            "Delete cart item error:",
            error
        );


        throw error;

    }
}
export {
    signup_api,
    login_api,
    logout,
    get_products_api,
    resolveImageUrl,
    formatPrice,
    home_api,
    change_password_api,
    add_to_cart_api,
    get_cart_api,
    delete_cart_item_api,
    
};

export type { Product, CartItem };