```javascript
/**
 * JADDY STUDIO - LOGIC.JS
 * Este archivo es el "Ingeniero Jefe". Traduce las frecuencias detectadas
 * en valores exactos para las perillas de tus plugins favoritos.
 */

const JaddyStudioBrain = {
    // Diccionario de parámetros técnicos por marca y tipo de efecto
    configuraciones: {
        "nativos": {
            ecualizador: (datos) => {
                const f = datos.frecuencia_critica || 380;
                return `Fruity Parametric EQ 2: Ve a la banda 3. Ajusta la frecuencia a ${f}Hz y reduce -3.2dB. Esto limpiará la zona opaca de la voz.`;
            },
            compresor: () => {
                return `Fruity Limiter (COMP): Threshold -19dB, Ratio 4:1, Attack 10ms, Release 140ms. Sube el Gain +2dB para compensar.`;
            },
            deesser: (datos) => {
                const s = datos.sibilancia || 7200;
                return `Fruity Limiter: Usa el modo de-esser en la banda de los ${s}Hz. Baja el umbral hasta que las 'S' no lastimen.`;
            }
        },
        "waves": {
            ecualizador: (datos) => {
                const f = datos.frecuencia_critica || 380;
                return `Waves Q10: En la banda 2, coloca ${f}Hz, Gain -4.0, Q 1.5. (Filtro de limpieza de resonancia).`;
            },
            compresor: () => {
                return `Waves CLA-76: Input 32, Output 16, Ratio 4. (Busca una reducción de ganancia de -4dB en los picos).`;
            },
            deesser: (datos) => {
                const s = datos.sibilancia || 7200;
                return `Renaissance DeEsser: Frecuencia en ${s}Hz, Thresh -22.5. Suaviza las altas frecuencias.`;
            }
        },
        "fabfilter": {
            ecualizador: (datos) => {
                const f = datos.frecuencia_critica || 380;
                return `Pro-Q 3: Crea un nodo dinámico en ${f}Hz. Baja -3dB. Solo actuará cuando esa frecuencia se vuelva molesta.`;
            },
            compresor: () => {
                return `Pro-C 2: Estilo 'Vocal', Ratio 4:1, Attack 10ms, Release Auto. Muy transparente.`;
            }
        }
    },

    /**
     * Función que genera el reporte final basado en la cadena de plugins
     * @param {Array} cadena - Los plugins elegidos por el usuario
     * @param {Object} resultadosIA - Datos del análisis de connection.js
     */
    procesarCadena(cadena, resultadosIA) {
        // Valores de respaldo inteligentes si la IA no detecta algo específico
        const datos = resultadosIA || { frecuencia_critica: 400, sibilancia: 7500 };

        return cadena.map((item, index) => {
            const marca = item.marca.toLowerCase();
            const tipo = item.tipo.toLowerCase();
            let instruccion = "Ajuste general sugerido: Controlar dinámica y balance tonal.";

            // Verificar si el plugin existe en nuestra base de datos
            if (this.configuraciones[marca] && this.configuraciones[marca][tipo]) {
                instruccion = this.configuraciones[marca][tipo](datos);
            }

            return {
                paso: index + 1,
                nombre: `${tipo.toUpperCase()} - ${marca.toUpperCase()}`,
                detalle: instruccion
            };
        });
    }
};

// Exportar al objeto global para que analisis.html o index.html lo lean
window.JaddyStudioBrain = JaddyStudioBrain;

```
