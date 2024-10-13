const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3PolarisatieThermometer {
    constructor (runtime) {
        this.runtime = runtime;
        this.apiUrl = 'https://pablofr-api-polarization-thermometer.hf.space/gradio_api/call/predict';
    }

    getInfo () {
        return {
            id: 'polarisatieThermometer',
            name: 'Polarisatie Thermometer',
            color1: '#FF6B6B',
            color2: '#FF1717',
            blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABNJJREFUWEft1etvU2UcB/Dv09OeXrbSrlvXbR1bx2gZm8DcJmCQS9VsXjAxARYv4EJ8YwwxoNHogmFRjCIYCcE3osEYjdHEF14YiIRtDpcMURmCdu0uHe0u7entnN4vp49ZhMSMATJK8AXnD3jO5/l+n+f3ENzmj9zm/+NqAOJwOFg+L49JiSK9t7w8RQgRbwV2VoCbEyyRiPBGIktWUMAnkzKH6ioMhwkh6VwjrgBQStnJoPAxQ9jNsUgYoiIPsXQmqiLpbbSk8AszIclcIq4ATExQVVIujBQoWEO+VALCyuCNi/DxMa+CZNoR1n1mNucOcQXA5aJKUR3v1WuUjSoAAi8gmkiCqgshROKTEjG5yxINfErM5pwkMVsFjDchPp2iOIhERM17vCjWaVFUrIcnAQSEiFeaiu4Me9yfNDU13fSZmPUQUkql50Yn2lyeqT0WU2WhuaQQoZCARDIJmqdBMJ6OMqnIfnk6vruqqipxM2fiqnPgQOcBeYNp/RZjubFDwcDoH3PCoNNCqy+CkJHAnxAFOUvfr1BIdxNCMnNFXHMQjY5SBc9wT05OTu0zleh0ljIDslmKsCjCF04gPOwUihaZ3qvUFbwJAjoXxHUnYWdnp1xTYX62tLJib3E+q+K8PjB+P4Y+OIi/Lgzjnu07QuUPW/eUyWXv3BLA9KKUUrkzEHvNMTa2o4hl5i0eG4bn9Z34dtSN1CorVrW1BcparHsr1Io9hJAbSuK6CVzeFXX1KY/zuvaF8fQLJrttnnjRid/6T6PvVA9ITT1WbH+RL1q9/EMhNPJuo6Ux2N3dTTiOo62bWrPXquc/A6YhXbRLWpNY1x7sOrlD4nRqywNecF9+jmPDY+BXrsWSJ55K5jcs/ZOhSTcD5FNGOqJSqr4KTrn7rFZrZLaKbgjwTx0dkiNnN7xqdE+8tIQP6TA1jvM9P+HHQTuSlnosXL8J0mwayYAfRcZSFNRVRxmt8iNC6FsNZjM3E3HDgMsLjCbpK9Levvasc0Qj906BPzuAqfJFyECCQfsfcPEh6NUFaFi5GqaND0HUKt4OTkzsmjm85gygFKTX5tiH/tPPN0aiChWVQxgZwfnf+zE0fhHjrBzhPDWqtSWwbtyA5JoGVzoZW7xs2bLov1OYM2B6ERfP6wKTvqPzR8aWq87aIPSegH/oAnwcByclGNcbwBpNWFtfD/aRZi5bUlCVUwDt6JCc2dz2deXg0OOaY8dB/R4w8TACdjsGhobgLilDrLoGS0tLoX/s0XHNwkpLWVNTLGcJnDlDZZIC1wnL6V/W5A0MAI13A2Ia9OgR2I7/AIdai4DegOoyIxSbWr1BjXJBS0tL7iqglDIOLnSo8IJtq+7nU0BtDZAVQb//BvaeHgzKlUjodKi6bw389z8wwZG05ZlcAqajvBhJNKd9oe/md3WzsiE7aIRH2GGHzeuFX66AprYOmQebIS4wHTaoZM/V1dWlclbBpTGtGubjHXl87GVdz0mw588hHvDDI2EQNZaBv2spwsWF/RpD4daVZrNt5qi+qVtweScuSnWxUGJbRhC2yD2cmonwWSGdIT6ZNEFV7BFGrdq/rrZ2eLZ3IieAS0lIf50EK+M8BPBgCkAqnaZxpTLTOiP2nFYwlyf4DuBOAv+rBP4Gu88mP1fQBcEAAAAASUVORK5CYII=',
            menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABNJJREFUWEft1etvU2UcB/Dv09OeXrbSrlvXbR1bx2gZm8DcJmCQS9VsXjAxARYv4EJ8YwwxoNHogmFRjCIYCcE3osEYjdHEF14YiIRtDpcMURmCdu0uHe0u7entnN4vp49ZhMSMATJK8AXnD3jO5/l+n+f3ENzmj9zm/+NqAOJwOFg+L49JiSK9t7w8RQgRbwV2VoCbEyyRiPBGIktWUMAnkzKH6ioMhwkh6VwjrgBQStnJoPAxQ9jNsUgYoiIPsXQmqiLpbbSk8AszIclcIq4ATExQVVIujBQoWEO+VALCyuCNi/DxMa+CZNoR1n1mNucOcQXA5aJKUR3v1WuUjSoAAi8gmkiCqgshROKTEjG5yxINfErM5pwkMVsFjDchPp2iOIhERM17vCjWaVFUrIcnAQSEiFeaiu4Me9yfNDU13fSZmPUQUkql50Yn2lyeqT0WU2WhuaQQoZCARDIJmqdBMJ6OMqnIfnk6vruqqipxM2fiqnPgQOcBeYNp/RZjubFDwcDoH3PCoNNCqy+CkJHAnxAFOUvfr1BIdxNCMnNFXHMQjY5SBc9wT05OTu0zleh0ljIDslmKsCjCF04gPOwUihaZ3qvUFbwJAjoXxHUnYWdnp1xTYX62tLJib3E+q+K8PjB+P4Y+OIi/Lgzjnu07QuUPW/eUyWXv3BLA9KKUUrkzEHvNMTa2o4hl5i0eG4bn9Z34dtSN1CorVrW1BcparHsr1Io9hJAbSuK6CVzeFXX1KY/zuvaF8fQLJrttnnjRid/6T6PvVA9ITT1WbH+RL1q9/EMhNPJuo6Ux2N3dTTiOo62bWrPXquc/A6YhXbRLWpNY1x7sOrlD4nRqywNecF9+jmPDY+BXrsWSJ55K5jcs/ZOhSTcD5FNGOqJSqr4KTrn7rFZrZLaKbgjwTx0dkiNnN7xqdE+8tIQP6TA1jvM9P+HHQTuSlnosXL8J0mwayYAfRcZSFNRVRxmt8iNC6FsNZjM3E3HDgMsLjCbpK9Levvasc0Qj906BPzuAqfJFyECCQfsfcPEh6NUFaFi5GqaND0HUKt4OTkzsmjm85gygFKTX5tiH/tPPN0aiChWVQxgZwfnf+zE0fhHjrBzhPDWqtSWwbtyA5JoGVzoZW7xs2bLov1OYM2B6ERfP6wKTvqPzR8aWq87aIPSegH/oAnwcByclGNcbwBpNWFtfD/aRZi5bUlCVUwDt6JCc2dz2deXg0OOaY8dB/R4w8TACdjsGhobgLilDrLoGS0tLoX/s0XHNwkpLWVNTLGcJnDlDZZIC1wnL6V/W5A0MAI13A2Ia9OgR2I7/AIdai4DegOoyIxSbWr1BjXJBS0tL7iqglDIOLnSo8IJtq+7nU0BtDZAVQb//BvaeHgzKlUjodKi6bw389z8wwZG05ZlcAqajvBhJNKd9oe/md3WzsiE7aIRH2GGHzeuFX66AprYOmQebIS4wHTaoZM/V1dWlclbBpTGtGubjHXl87GVdz0mw588hHvDDI2EQNZaBv2spwsWF/RpD4daVZrNt5qi+qVtweScuSnWxUGJbRhC2yD2cmonwWSGdIT6ZNEFV7BFGrdq/rrZ2eLZ3IieAS0lIf50EK+M8BPBgCkAqnaZxpTLTOiP2nFYwlyf4DuBOAv+rBP4Gu88mP1fQBcEAAAAASUVORK5CYII=',
            blocks: [
                {
                    opcode: 'isPolarizing',
                    blockType: BlockType.BOOLEAN,
                    text: 'Is [TEXT] polariserend?',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Voer je zin in...'
                        }
                    }
                },
                {
                    opcode: 'getPolarizationProbability',
                    blockType: BlockType.REPORTER,
                    text: 'Polarisatie kans van [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Voer je zin in...'
                        }
                    }
                }
            ]
        };
    }

    isPolarizing (args) {
        return new Promise(resolve => {
            this._makeRequest(args.TEXT)
                .then(result => {
                    resolve(result["Is Polarizing"] === true);
                })
                .catch(() => resolve(false));  // We assume non-polarizing if error
        });
    }

    getPolarizationProbability (args) {
        return this._makeRequest(args.TEXT)
            .then(result => {
                const probabilityStr = result["Probability"];
                const probabilityNum = parseFloat(probabilityStr);
                return (probabilityNum).toFixed(2) + '%';
            })
            .catch(() => 'Error');
    }

    _makeRequest (text) {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: [text] })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(initialData => {
            const eventId = initialData.event_id;
            return fetch(`${this.apiUrl}/${eventId}`);
        })
        .then(resultResponse => {
            if (!resultResponse.ok) {
                throw new Error('Network response was not ok');
            }
            return resultResponse.text();
        })
        .then(resultText => {
            if (resultText.includes('event: complete')) {
                const jsonStr = resultText.split('data: ')[1];
                const jsonData = JSON.parse(jsonStr);
                return jsonData[0];
            }
            throw new Error('No complete event received');
        });
    }
}

module.exports = Scratch3PolarisatieThermometer;