const app = new Vue({
    el: "#root",
    data: {
        lengthMailingList: 200,
        list: {
            visible: false,
            emails: []
        }
    },
    created() {
        this.getMailingList();
    },
    methods: {
        getMailingList() {
            if (this.list.emails.length > this.lengthMailingList) {
                while (this.list.emails.length > this.lengthMailingList) this.slice();
            }
            else if (this.list.emails.length < this.lengthMailingList) {
                for (let i = this.list.emails.length; i < this.lengthMailingList; i++) this.get();
            }
        },
        get() {
            this.list.visible = false;
            axios.get("https://flynn.boolean.careers/exercises/api/random/mail")
                .then((response) => {
                    this.list.emails.push(response.data.response);
                    this.list.visible = false;
                    if (this.list.emails.length == this.lengthMailingList) this.list.visible = true;
                });
        },
        slice() {
            this.list.emails = this.list.emails.slice(0, -1);
        }
    }
});

// axios.get("https://flynn.boolean.careers/exercises/api/random/mail")
//             .then((response) => {
//                 this.debug = response.data.response;
//             });