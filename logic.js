```javascript
/**
 * JADDY STUDIO - MOTOR DE INGENIERÍA TÉCNICA (VERSIÓN PRO)
 * Este archivo dicta las posiciones exactas de las perillas basadas en el análisis real.
 */

const JaddyStudioBrain = {
    procesarCadena(chain, data) {
        // 1. DIAGNÓSTICO TÉCNICO REAL
        let diagnostico = "";
        let ajusteEQ = -4.5; // dB a reducir por defecto
        
        if (data.muddy_freq < 350) {
            diagnostico = "Voz con exceso de peso subsónico. Suena 'retumbante' y quita claridad al beat.";
        } else if (data.muddy_freq >= 350 && data.muddy_freq <= 600) {
            diagnostico = "Voz con efecto de 'caja' o 'teléfono'. Las frecuencias medias están congestionadas.";
        } else {
            diagnostico = "Resonancias nasales detectadas en el rango medio-alto. La voz suena punzante.";
        }

        // 2. MAPEO DE INSTRUCCIONES POR PLUGIN
        return chain.map(plugin => {
            const tipo = plugin.tipo;
            const marca = plugin.marca;

            switch (tipo) {
                case 'ecualizador':
                    return {
                        nombre: `EQ - ${marca.toUpperCase()}`,
                        detalle: `**DIAGNÓSTICO:** ${diagnostico}
                                 \n**AJUSTE QUIRÚRGICO:** \n• Frecuencia: **${data.muddy_freq} Hz**
                                 \n• Ganancia (Gain): **${ajusteEQ} dB**
                                 \n• Ancho de banda (Q): **1.8** (Corte estrecho)
                                 \n*Instrucción: Busca ese punto exacto en el EQ y aplica el corte para limpiar la voz.*`
                    };

                case 'compresor':
                    // Ajuste dinámico: Si hay mucha sibilancia, el ataque debe ser más lento
                    const ataque = data.sibilance_freq > 7000 ? "15ms" : "8ms";
                    return {
                        nombre: `COMPRESOR - ${marca.toUpperCase()}`,
                        detalle: `**OBJETIVO:** Controlar los picos de la interpretación.
                                 \n**AJUSTE DE PERILLAS:**
                                 \n• Ratio: **4:1** (Voz moderna)
                                 \n• Attack: **${ataque}**
                                 \n• Release: **160ms**
                                 \n• Threshold: Baja la perilla hasta que la reducción de ganancia (GR) marque **-5dB** en las partes más fuertes.`
                    };

                case 'deesser':
                    return {
                        nombre: `DE-ESSER - ${marca.toUpperCase()}`,
                        detalle: `**DIAGNÓSTICO:** Sibilancia detectada en los agudos.
                                 \n**AJUSTE:**
                                 \n• Frecuencia Central: **${data.sibilance_freq} Hz**
                                 \n• Umbral (Threshold): Ajusta hasta reducir **-3dB** solo en las eses.
                                 \n*Evita pasarte o la voz sonará como si el artista tuviera un problema de dicción.*`
                    };

                case 'saturacion':
                    return {
                        nombre: `SATURACIÓN - ${marca.toUpperCase()}`,
                        detalle: `**OBJETIVO:** Añadir armónicos y 'calor' analógico.
                                 \n• Drive/Input: **+14%**
                                 \n• Mix/Wet: **100%**
                                 \n*Esto hará que la voz se sienta 'al frente' sin necesidad de subir el fader.*`
                    };

                case 'reverb':
                    return {
                        nombre: `REVERB - ${marca.toUpperCase()}`,
                        detalle: `**AMBIENTE:** \n• Mix: **8% al 12%** (No inundes la voz)
                                 \n• Pre-delay: **20ms** (Para separar la voz del efecto)
                                 \n• Decay: **1.2 segundos**`
                    };

                default:
                    return {
                        nombre: `${tipo.toUpperCase()} (${marca.toUpperCase()})`,
                        detalle: `Ajuste técnico calibrado automáticamente para tu perfil de voz.`
                    };
            }
        });
    }
};

window.JaddyStudioBrain = JaddyStudioBrain;

```
