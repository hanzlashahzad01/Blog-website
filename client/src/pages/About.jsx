import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <h1 className="mb-4">About Us</h1>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h2 className="card-title mb-3">Welcome to Our Blog</h2>
            <p className="card-text lead">
              We are passionate about sharing knowledge, stories, and insights with our community.
              Our blog is a platform where ideas come to life and conversations begin.
            </p>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h3 className="card-title mb-3">Our Mission</h3>
            <p className="card-text">
              Our mission is to create a space where people can express themselves freely,
              share their experiences, and learn from each other. We believe in the power of
              storytelling and the importance of diverse perspectives.
            </p>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h3 className="card-title mb-3">What We Offer</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>Quality Content:</strong> Thoughtfully crafted articles and posts
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>Community Engagement:</strong> A platform for discussion and interaction
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>User-Friendly Experience:</strong> Easy-to-use interface for readers and writers
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>Diverse Topics:</strong> Content covering a wide range of interests
              </li>
            </ul>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h3 className="card-title mb-3">Get Involved</h3>
            <p className="card-text">
              Whether you're a reader looking for interesting content or a writer wanting to share
              your thoughts, we welcome you to our community. Create an account to start posting
              your own articles or simply browse and engage with existing content.
            </p>
            <p className="card-text">
              Have questions or suggestions? Feel free to{' '}
              <Link to="/contact" className="text-decoration-none">contact us</Link> - we'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="card-title mb-3">Thank You</h3>
            <p className="card-text mb-0">
              Thank you for being part of our community. Your engagement and support help us
              continue to grow and improve. We look forward to sharing more great content with you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

