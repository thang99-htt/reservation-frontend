<script>
    export default {
        props: {
            room: { type: Object, required: true },
        },
    };
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ room.name }}
        </div>
        <div class="p-1">
            <strong>Giá:</strong>
            {{ room.price }}
        </div>
        <div class="p-1">
            <strong>Loại phòng:</strong>
            {{ room.type }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ room.phone }}
        </div>
        <div class="p-1">
            <strong>Trạng thái phòng:&nbsp;</strong>
            <i v-if="room.is_vailable" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>