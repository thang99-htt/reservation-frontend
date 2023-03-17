<template>
    <Form
        @submit="submitRoom"
        :validation-schema="roomFormSchema"
    >
        <div class="form-group">
            <label for="name">Số phòng</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="roomLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="type">Loại phòng</label>
            <Field
                name="type"
                type="tex"
                class="form-control"
                v-model="roomLocal.type"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá phòng</label>
            <Field
                name="price"
                type="text"
                class="form-control"
                v-model="roomLocal.price"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="roomLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Trạng thái phòng</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i>
                Lưu
            </button>
            <button
                v-if="roomLocal._id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteRoom"
            >
                <i class="fas fa-trash"></i>
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:room", "delete:room"],
        props: {
            room: { type: Object, required: true }
        },
        data() {
            const roomFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
                address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
                phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            });
            return {
                // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
                // roomLocal để liên kết với các input trên form
                roomLocal: this.room,
                roomFormSchema,
            };
        },
        methods: {
            submitRoom() {
                this.$emit("submit:room", this.roomLocal);
            },
            deleteRoom() {
                this.$emit("delete:room", this.roomLocal._id);
            },
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>