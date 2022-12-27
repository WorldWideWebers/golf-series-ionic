import { defineStore } from "pinia";

export const useStoreUI = defineStore("storeUI", {
    state: () => {
        return {
            overlayShown: false
        };
    },
    actions: {
        showOverlay() {
            this.overlayShown = true;
        },
        hideOverlay() {
            this.overlayShown = false;
        }
    }
});