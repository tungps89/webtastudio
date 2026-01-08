import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        defineField({
            name: 'orderNumber',
            title: 'Order Number',
            type: 'string',
        }),
        defineField({
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
        }),
        defineField({
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string',
            options: {
                list: [
                    { title: 'COD (Thanh toán khi nhận hàng)', value: 'cod' },
                    { title: 'Chuyển khoản ngân hàng', value: 'bank' }
                ]
            }
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Completed', value: 'completed' },
                    { title: 'Cancelled', value: 'cancelled' }
                ],
                layout: 'radio'
            },
            initialValue: 'pending'
        }),
        defineField({
            name: 'items',
            title: 'Order Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'productName', type: 'string' },
                        { name: 'quantity', type: 'number' },
                        { name: 'price', type: 'number' },
                        { name: 'slug', type: 'string' },
                        { name: 'image', type: 'string' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'totalAmount',
            title: 'Total Amount',
            type: 'number'
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        })
    ]
})
