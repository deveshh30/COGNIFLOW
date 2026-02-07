export const fakeApiDelay = (data, delay = 600) => 
    new Promise(resolve => {
        setTimeout(() => resolve(data), delay);
    });