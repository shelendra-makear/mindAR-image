


export function hideElement(element, time) {

    element.style.visibility = 'hidden'

    element.style.opacity = '0'

    if (time || time == 0) {

        setTimeout(() => {

            element.style.display = 'none'

        }, time)

    }

}

export function showElement(element, time, displayType) {

    if (time || time == 0) { element.style.display = displayType ? displayType : 'block' }

    setTimeout(() => {

        element.style.visibility = 'visible'

        element.style.opacity = '1'

    }, time || 0)

}


