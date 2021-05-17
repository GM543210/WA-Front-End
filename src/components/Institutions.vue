<template>

<div class="container centered">
    <div class="row">
        <div class="col-2">
            <div class="institutions" @click="onInstitutionSelected()">
                <img class="resize" src="@/assets/institution.png">
                <span class="caption">{{ institutions.Caption }}</span>
                <span class="caption">{{ institutions.Adress }}{{ institutions.City }}</span>
                <span class="caption">{{ institutions.WorkingHours }}</span>
            </div>
        </div>
        <br>

    </div>
</div>

</template>

<script>
export default {
    name: 'Institutions',
    props: ['institution',],
    methods: {
        onInstitutionSelected() { 
            this.$router.push({name: "enter-q"});
        },
    },
};

</script>

<style>

.institutions {
    cursor: pointer;
}

.resize {
    width: 5%;
}

.products {
    display: inline-block;
    margin-left: 100px;
}

.category-filter {
    vertical-align: top;
    display: inline-block;
    text-align: center;
    margin-right: 3%;
}

.caption {
    display: block;
    margin-top: 2px;
    width: 100px;
}
</style>
