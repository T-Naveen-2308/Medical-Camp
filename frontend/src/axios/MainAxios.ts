import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

interface ApiResponse {
    message?: string;
    [key: string]: any;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;
const timeout = Number(import.meta.env.VITE_TIMEOUT) || 5000;

if (!baseURL) {
    throw new Error(
        "VITE_API_BASE_URL is not defined in the environment variables."
    );
}

const MainAxios: AxiosInstance = axios.create({
    baseURL: `${baseURL}`,
    timeout: timeout,
    headers: {
        "Content-Type": "application/json"
    }
});

MainAxios.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        if (response.data?.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    (error: AxiosError<ApiResponse>) => {
        const errorMessage =
            error.response?.data?.message ||
            "Internal error occurred. Please try again later.";
        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

export default MainAxios;
