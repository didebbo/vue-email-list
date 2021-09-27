const app = new Vue({
    el: "#root",
    data: {
        howManyEmails: 10,
        list: {
            visible: false,
            emails: []
        }
    },
    methods: {}
});

// axios.get("https://flynn.boolean.careers/exercises/api/random/mail")
//             .then((response) => {
//                 this.debug = response.data.response;
//             });