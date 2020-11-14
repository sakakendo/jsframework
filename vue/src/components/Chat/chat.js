export default {
    name: 'chat',
    methods: {
        send_message(){
            this.messages.push(this.message);
            this.message = "";
        }
    },
    data() {
        return {
            channels: ["general", "random"],
            message: "",
            messages: []
        }
    }
}
