import z from 'zod'

export const registerFormSchema = z.object({
    // khai báo tất cả các trường thông tin của form kèm validation nếu có
    hoTen: z
        .string({
            error: 'Vui lòng nhập họ tên',
        })
        .min(1, 'Vui lòng nhập họ tên')
        .min(5, 'Họ tên phải có ít nhất 5 ký tự')
        .max(20, 'Họ tên không được vượt quá 20 ký tự')
        .regex(/^[a-zA-Z\s]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),

    // email: z.email('Vui lòng nhập email hợp lệ').optional(), // optional() có nghĩa là trường này không bắt buộc, nếu có thì phải đúng định dạng email
    email: z.email('Vui lòng nhập email hợp lệ'), // optional() có nghĩa là trường này không bắt buộc, nếu có thì phải đúng định dạng email
    taiKhoan: z.string().optional(), // optional() có nghĩa là trường này không bắt buộc
    matKhau: z.string().optional(), // optional() có nghĩa là trường này không bắt buộc
    soDt: z.string().optional(), // optional() có nghĩa là trường này không bắt buộc
    maNhom: z.string().optional(), // optional() có nghĩa là trường này không bắt buộc
})
