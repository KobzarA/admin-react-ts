import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../config";
import { IProduct } from "../interfaces/models";
import { IResponse } from "../interfaces/api";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE, credentials: "include" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<IResponse<Array<IProduct>>, void>({
      query: () => "products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id: string) => `products/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({
        id,
        newProductData,
      }: {
        id: string;
        newProductData: Partial<IProduct>;
      }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: newProductData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (body: Omit<IProduct, "_id">) => ({
        url: `products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} = productsApi;
