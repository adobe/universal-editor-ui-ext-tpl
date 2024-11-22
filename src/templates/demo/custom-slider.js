import React from 'react'
import {defaultTheme, Provider, Slider, Text} from "@adobe/react-spectrum"
import { useEffect, useState } from "react"
import { attach } from "@adobe/uix-guest"
import { extensionId } from "./Constants"

const SpectrumSliderRenderer = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [guestConnection, setGuestConnection] = useState()
    const [model, setModel] = useState()
    const [fieldValue, setFieldValue] = useState(0)
    const [colorScheme, setColorScheme] = useState()

    useEffect(() => {
        const init = async () => {
            const guestConnection = await attach({id: extensionId})
            setGuestConnection(guestConnection)
            setModel(await guestConnection.host.field.getModel())
            setFieldValue(await guestConnection.host.field.getValue())
            setColorScheme(await guestConnection.sharedContext.get("theme"))
            setIsLoading(false)
        }
        init().catch((e) =>
            console.error("SpectrumSliderRenderer got an error during initialization:", e)
        )
    }, [])

    const onChangeEndHandler = (v) => {
        setFieldValue(v)
        guestConnection.host.field.onChange(v)
    }

    return (
        <Provider theme={defaultTheme} colorScheme={colorScheme}>
            <>
                {!isLoading ? (
                    <Slider
                        label={model.label}
                        minValue={model.minValue}
                        maxValue={model.maxValue}
                        //getValueLabel={value => `${value}%`}
                        defaultValue={fieldValue ?? 0}
                        isFilled={model.isFilled ?? true}
                        fillOffset={model.fillOffset ?? 0}
                        trackGradient={model.trackGradient ?? []}
                        step={model.step ?? 1}
                        labelPosition={model.labelPosition ?? 'top'}
                        showValueLabel={model.showValueLabel}
                        formatOptions={model.formatOptions}
                        //contextualHelp={model.contextualHelp}
                        orientation={model.orientation ?? 'horizontal'}
                        onChangeEnd={onChangeEndHandler}
                    />
                ) : (
                    <Text>Loading</Text>
                )}
            </>
        </Provider>
    )
}

export default SpectrumSliderRenderer
