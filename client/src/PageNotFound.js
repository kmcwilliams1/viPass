import React from "react";


class PageNotFound extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    }

    render() {
        const styles = {
            notfound: {
                height: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            },
            notfound_404: {
                position: "relative",
                height: "240px"
            }
        };
        return (
            <div>
                <div style={styles.notfound}>
                    <div style={styles.notfound_404}>
                        <h3>Oops! Page not found</h3>
                        <h1 style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "252px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "-40px",
                            marginLeft: "-20px",
                            marginTop: "20px"
                        }}><span>4</span><span>0</span><span>4</span></h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                </div>
            </div>
        );
    }
}

export default PageNotFound;
