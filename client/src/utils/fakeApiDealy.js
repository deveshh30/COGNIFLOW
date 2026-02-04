export const fakeApiDelay = (data, delay = 1200) => 
    new Promise(resolve => {
        setTimeout(() => resolve(data), delay);
    });