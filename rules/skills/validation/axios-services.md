import { api } from '../api/config';
import { ProductSchema, ProductsSchema, SuccessSchema } from '../schemas';
import type { Product, ProductId } from '../types';

✅ **Así SÍ**

export const ProductService = {
  // GET - Lista: Valida un array de objetos
  getAll: async () => {
    const { data } = await api.get('/products');
    return ProductsSchema.parse(data); // Garantiza que data sea Product[]
  },

✅ **Así SÍ**

  // GET - Único: Valida un objeto individual
  getById: async (id: ProductId) => {
    const { data } = await api.get(`/products/${id}`);
    return ProductSchema.parse(data);
  },

✅ **Así SÍ**

  // POST - Creación: Valida la respuesta de éxito del servidor
  create: async (payload: Omit<Product, 'id'>) => {
    const { data } = await api.post('/products', payload);
    return SuccessSchema.parse(data); // Valida { success: true, message: "..." }
  },

✅ **Así SÍ**

  // PUT - Actualización: Retorna la entidad actualizada y validada
  update: async (id: ProductId, payload: Partial<Product>) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return ProductSchema.parse(data);
  },

  ✅ **Así SÍ**

  // DELETE - Eliminación
  delete: async (id: ProductId) => {
    const { data } = await api.delete(`/products/${id}`);
    return SuccessSchema.parse(data);
  }
};