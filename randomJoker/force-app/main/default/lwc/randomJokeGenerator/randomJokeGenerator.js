import { LightningElement, api } from 'lwc';
import updateLeadRecord from '@salesforce/apex/LeadActionHandler.updateLeadRecord';

export default class RandomJokeGenerator extends LightningElement {

    @api recordId;
    jokeSetup;
    punchline;

    connectedCallback() {
        this.getJoke();
    }

    async updateLeadRecord(){
        const response = JSON.parse(
            await updateLeadRecord({ leadId: this.recordId })
        );
        if(response && response.success) {
            window.location.reload();
        }
        
    }

    getJoke() {
        const jokeURL = "https://official-joke-api.appspot.com/random_joke";
        fetch(jokeURL, {
            method : "GET",
            headers : {
                Accept : "application/json"
            }
        })
        .then ((response) => {
            if(response.status === 200) {
                return response.json();
            }
        })
        .then((responseJSON) => {
            this.jokeSetup = responseJSON.setup;
            this.punchline = responseJSON.punchline;
        });
    }



}