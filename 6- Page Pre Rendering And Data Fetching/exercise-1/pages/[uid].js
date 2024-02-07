function UserIdPage(props) {
    return <h1>{props.id}</h1>
}

export async function getServerSideProps(context) {
    // getServerSideProps means this page should not be pre-generated on build time
    // it serves UserIdPage() with props

    const { params } = context;

    const userid = params.uid;

    return {
        props: {
            id: 'userid-' + userid,
        }
    }
}

export default UserIdPage;