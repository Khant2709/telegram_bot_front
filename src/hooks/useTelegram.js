//Хук для вынесения всех часто используемых данных и методов из тг

//Выносим в отдельную переменную путь к вызовам методов ТГ
const tg = window.Telegram.WebApp;

export function useTelegram() {

    //Функция для закрытия веб-приложения в ТГ
    const onClose = () => {
        tg.close();
    }

    //Функция для показа || скрытия специальной кнопки, которая есть в ТГ от разрабов
    // (Основная кнопка для взаимодействия с ботом)
    const onToggleButton = () => {
        tg.MainButton.isVisible
            ? tg.MainButton.hide()
            : tg.MainButton.show()
    }

    return {
        tg,
        user: tg.initDataUnsafe?.user,
        onClose,
        onToggleButton,
        queryId: tg.initDataUnsafe?.query_id

    }
}
