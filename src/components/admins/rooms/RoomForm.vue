<template>
    <Form
        @submit="submitRoom"
        :validation-schema="roomFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên phòng</label>
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
            <ErrorMessage name="type" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá phòng</label>
            <Field
                name="price"
                type="numbder"
                class="form-control"
                v-model="roomLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="capacity">Sức chứa</label>
            <Field
                name="capacity"
                type="number"
                class="form-control"
                v-model="roomLocal.capacity"
            />
            <ErrorMessage name="capacity" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-success">
                <i class="fas fa-save"></i>
                Lưu
            </button>
            <button
                v-if="roomLocal._id"
                type="button"
                class="ms-2 btn btn-danger"
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
                .required("Tên phòng phải có giá trị.")
                .min(2, "Tên phòng phải ít nhất 2 ký tự.")
                .max(50, "Tên phòng có nhiều nhất 50 ký tự."),
                type: yup
                .string()
                .required("Loại phòng phải có giá trị.")
                .min(2, "Loại phòng phải ít nhất 2 ký tự.")
                .max(50, "Loại phòng có nhiều nhất 50 ký tự."),
                price: yup
                .string()
                .required("Giá phải có giá trị."),
                capacity: yup
                .string()
                .required("Sưc chứa phải có giá trị."),
            });
            return {
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