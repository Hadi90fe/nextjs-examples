function UserProfilePage(props) {
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

export async function getServerSideProps(context) {
    // getServerSideProps means this page should not be pre-generated on build time
    // it serves UserIdPage() with props

    const { params, req, res } = context;

    return {
        props: {
            username: 'MAX',
        }
    };
}