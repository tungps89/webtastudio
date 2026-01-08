'use server';

import { client } from "@/sanity/lib/client";

export async function createOrder(data: any) {
    try {
        const result = await client.create({
            _type: 'order',
            ...data,
            createdAt: new Date().toISOString(),
            status: 'pending'
        });
        return { success: true, id: result._id };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: 'Failed to create order' };
    }
}
