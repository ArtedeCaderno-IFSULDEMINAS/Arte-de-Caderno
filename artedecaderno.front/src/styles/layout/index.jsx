import { ContentContainer, PageContainer } from '../sharedStyles'
import Navbar from 'src/components/navbar'

const Layout = ({children, currentPage}) => {
  return (
    <PageContainer>
        <Navbar currentPage={currentPage} />
        <ContentContainer>
            {children}
        </ContentContainer>
    </PageContainer>
  )
}

export default Layout