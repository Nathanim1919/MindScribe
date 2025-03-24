export const EditorIntro:React.FC = () => {
    return (
        <div className=" dark:text-dark-base/30">
            <h1 className="text-[10rem] font-bold">MindScribe</h1>
            <div>
                <p>{`Type "/" or Click + to Choose Text types`} </p>
                <p>{`Click :: to Get Options`} </p>
            </div>
        </div>
    )
}