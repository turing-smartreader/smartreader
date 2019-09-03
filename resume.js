function webAudioTouchUnlock (context)
{
    return new Promise((resolve, reject) =>
    {
        if (context.state === 'suspended' && 'ontouchstart' in window)
        {
            let unlock = () =>
            {
                context.resume().then(()=>
                    {
                        document.body.removeEventListener('touchstart', unlock);
                        document.body.removeEventListener('touchend', unlock);

                        resolve(true);
                    },
                    (reason)=>
                    {
                        reject(reason);
                    }
                );
            };

            document.body.addEventListener('touchstart', unlock, false);
            document.body.addEventListener('touchend', unlock, false);
        }
        else
        {
            resolve(false);
        }
    });
}
