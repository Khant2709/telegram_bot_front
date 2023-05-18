import { useEffect } from 'react';

const useMainButtonEvent = (tg, onSendData) => {
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [tg, onSendData]);
};

export default useMainButtonEvent;