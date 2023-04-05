import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import BlogsImg from "./BlogsImg";
import { Fade } from "react-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio.js";
import { style } from "glamor";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert';


const ContactData = contactPageData.contactSection;
const blogSection = contactPageData.blogSection;

function Contact(props) {
  const theme = props.theme;
  const form = useRef();
  const [value, setValue] = useState('Send Email')

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”
    if(form.current.user_email.value === '' || form.current.from_name.value === '' || form.current.message.value === ''){
      alert("Please fill all the fields");
      return false;
    }
    setValue("Sending...")
    emailjs.sendForm('service_4zg4zeo', 'template_xhmf6si', form.current, 'BTw-jO3Tb6Zg3uqmN')
      .then((result) => {
         // show the user a success message
          setValue('Send Email')
          alert("Email sent successfully!");
          form.current.user_email.value = '';
          form.current.from_name.value = '';
          form.current.message.value = '';

      }, (error) => {
         // show the user an error
          setValue('Send Email')
          alert("Something went wrong, please try again later!");          
    });
  };

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  return (
    <div className="contact-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
        <Fade bottom duration={1000} distance="40px">
          <div className="contact-heading-div">
            <div className="contact-heading-img-div" style={{marginLeft: 0}}>
              <img
                className="profile-pic"
                src={require(`../../assests/images/${ContactData["profile_image_path"]}`)}
                alt=""
              />
            </div>
            <div className="contact-heading-text-div">
              <h1
                className="contact-heading-text"
                style={{ color: theme.text }}
              >
                {ContactData["title"]}
              </h1>
              <p
                className="contact-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {ContactData["description"]}
              </p>
              <SocialMedia />
              <br />
              <br />
              <a {...styles} className="general-btn" href={greeting.resumeLink}>
                See my Resume
              </a>
            </div>
          </div>
        </Fade>
        <Fade bottom duration={1000} distance="40px">
          <div className="blog-heading-div">
            <div className="">
              <form ref={form} onSubmit={sendEmail}>
                <Form.Control  type="email" className="mb-3 mt-3" name="user_email" placeholder="Enter your Email..." />                
                <Form.Control className="mb-3" name="from_name"  type="text" placeholder="Enter Your Name..." />
                <Form.Control as="textarea" name="message" width={"50%"} rows={8} placeholder="Type your message here... " />

                <div className="blogsite-btn-div" style={{textAlign: 'center'}}>
                  <input {...styles} className="general-btn" type="submit" value={value} />
                </div>

              </form>
            </div>
             {/* <div className="blog-heading-text-div">
              <h1 className="blog-heading-text" style={{ color: theme.text }}>
                {blogSection["title"]}
              </h1>
              <p
                className="blog-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {blogSection["subtitle"]}
              </p>
              <div className="blogsite-btn-div">
                <a {...styles} className="general-btn" href={blogSection.link}>
                  My Twitter Profile
                </a>
              </div>
            </div>  */}
            <div className="blog-heading-img-div">
              <BlogsImg theme={theme} />
            </div>
          </div>
        </Fade>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Contact;
