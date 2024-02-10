import { getData } from "@/helpers/getters-setters";

function FeedbackDetailPage(props) {
    return (
        <div>[id]</div>
    )
}

export async function getStaticProps(context){

    return {

        props: {

        }
    }

}

export async function getStaticPaths(){
    const dataPaths = getData();

}

export default FeedbackDetailPage;