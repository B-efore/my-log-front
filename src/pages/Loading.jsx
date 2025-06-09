import loadingImage from '../assets/탐험왹.png'

const Loading = () => {
    return(
        <div>
            <div className="loading-container">
                <img
                    className="loading-img"
                    src={loadingImage}
                    alt="로딩"
                />
            </div>
        </div>
    )
}

export default Loading;