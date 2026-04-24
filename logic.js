```javascript
/**
 * JADDY STUDIO - LOGIC.JS
 * Este es el sistema de inteligencia que traduce análisis de frecuencia 
 * en parámetros reales de perillas para plugins.
 */

const JaddyStudioBrain = {
    // Definición de presets inteligentes por marca de plugin
    presets: {
        "nativos": {
            ecualizador: (data) => {
                const freq = data.frecuencia_molesta || 380;
                const db = data.reduccion_sugerida || 3.5;
                return `Fruity Parametric EQ 2: En la banda 3, ajusta a ${freq}Hz y baja -${db}dB con un Q de 40%. Objetivo: Limpiar el fango de la voz.`;
            },
            compresor: (data) => {
                return `Fruity Limiter (COMP): Threshold -18.5dB, Ratio 4.2:1, Attack 12ms, Release 150ms. Curva de rodilla (Knee) al 30%.`;
            },
            deesser: (data) => {
                const ss = data.sibilancia || 7200;
                return `Fruity Limiter: Modo de-esser configurado en ${ss}Hz. Ajusta el umbral hasta capturar las eses sin perder aire.`;
            }
        },
        "waves": {
            ecualizador: (data) => {
                const freq = data.frecuencia_molesta || 380;
                return `Waves Q10: Banda 2 en ${freq}Hz, Gain -4.0, Q 1.8. Esto eliminará la resonancia nasal detectada.`;
            },
            compresor: (data) => {
                return `Waves CLA-76: Input en 30, Output en 18, Ratio 4. Attack en 3, Release en 5. Busca una reducción de -3 a -5dB.`;
            },
            deesser: (data) => {
                const ss = data.sibilancia || 7200;
                return `Renaissance DeEsser: Thresh -24.0, Freq ${ss}Hz, Mode Split. Control dinámico de altas frecuencias.`;
            }
        },
        "fabfilter": {
            ecualizador: (data) => {
                const freq = data.frecuencia_molesta || 380;
                return `Pro-Q 3: Nodo dinámico en ${freq}Hz. Bajar -3.5dB. Esto solo actuará cuando la frecuencia se descontrole.`;
            },
            compresor: (data) => {
                return `Pro-C 2: Style 'Vocal', Threshold -20dB, Ratio 4:1, Attack 10ms, Lookahead 0.5ms.`;
            }
        }
    },

    /**
     * Procesa la cadena de plugins elegida por el usuario
     * @param {Array} cadena - Lista de objetos {tipo, marca}
     * @param {Object} datosAudio - Datos provenientes de connection.js
     */
    generarInstrucciones(cadena, datosAudio) {
        // Valores de respaldo si la API no devuelve datos específicos
        const analisis = datosAudio || { 
            frecuencia_molesta: 400, 
            sibilancia: 7500,
            dynamic_range: 12 
        };

        console.log("Jaddy Logic: Procesando datos...", analisis);

        return cadena.map((item, index) => {
            const marca = item.marca.toLowerCase();
            const tipo = item.tipo.toLowerCase();
            
            let instruccionFinal = "";

            // Buscamos si tenemos la configuración para ese plugin específico
            if (this.presets[marca] && this.presets[marca][tipo]) {
                instruccionFinal = this.presets[marca][tipo](analisis);
            } else {
                instruccionFinal = `Configuración sugerida para ${tipo}: Ajustar balance general. (Plugin pendiente de mapeo detallado).`;
            }

            return {
                orden: index + 1,
                plugin: `${tipo.toUpperCase()} (${marca.toUpperCase()})`,
                texto: instruccionFinal
            };
        });
    }
};

// Hacer que el cerebro sea accesible globalmente
window.JaddyStudioBrain = JaddyStudioBrain;

```
