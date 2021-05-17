<template>

<div class="container centered">
    <div class="row">
        <div class="col-2">
            <div class="" @click="onWindowSelected()">
                <span class="">{{ Windows.Caption }}</span>
            </div>
        </div>
        <br>

    </div>
</div>

</template>

<script>
export default {
    name: 'Windows',
    props: ['window',],
    methods: {
        onWindowSelected() {
            this.$router.push({name: "manage-window"});
        },
    },
};

</script>

<style>

</style>