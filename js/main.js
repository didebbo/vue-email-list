const app = new Vue({
    el: "#root",
    data: {
        lengthMailingList: 10,
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
                while (this.list.emails.length > this.lengthMailingList) this.sliceEmail();
            }
            else if (this.list.emails.length < this.lengthMailingList) {
                for (let i = this.list.emails.length; i < this.lengthMailingList; i++) this.getEmail();
            }
        },
        getEmail() {
            this.list.visible = false;
            axios.get("https://flynn.boolean.careers/exercises/api/random/mail")
                .then((response) => {
                    this.list.emails.push(
                        {
                            text: response.data.response,
                            editMode: false
                        }
                    );
                    if (this.list.emails.length == this.lengthMailingList) this.list.visible = true;
                });
        },
        sliceEmail() {
            this.list.emails = this.list.emails.slice(0, -1);
        },
        editEmail(index) {
            this.list.emails.at(index).editMode = true;
        },
        saveEditedEmail(index) {
            if (this.list.emails.at(index).text == "") this.deleteEmail(index)
            this.list.emails.at(index).editMode = false;
        },
        deleteEmail(index) {
            this.list.emails.splice(index, 1);
            this.lengthMailingList = this.list.emails.length;
        },
        addEmail() {
            this.list.emails = [
                {
                    text: "",
                    editMode: true
                },
                ...this.list.emails
            ];
            this.lengthMailingList = this.list.emails.length;
        }
    }
});