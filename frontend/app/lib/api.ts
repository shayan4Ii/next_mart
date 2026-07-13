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


// Fetch all products from backend
async function get_products_api() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            console.log("Products fetch failed:", response.status);
            return [];
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Products fetch error:", error);
        return [];
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

export {
    signup_api,
    login_api,
    logout,
    get_products_api,
    resolveImageUrl,
    formatPrice,
    home_api,
};

export type { Product };