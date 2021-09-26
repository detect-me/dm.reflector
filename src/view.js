const renderApp = ({ blackPageURL }, { search }) => `
    <style>
        body,
        html {
            overflow: hidden
        }

        #dm-app {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999999999;
            width: 100%;
            height: 100%;
            border: 0;
        }
    </style>
    <iframe id="dm-app" src="${blackPageURL}${search}" />
`;

export default renderApp;
