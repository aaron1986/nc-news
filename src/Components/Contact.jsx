export default function Contact() {
    return (
      <>
      <h2 className="contact-text">Contact</h2>
        <section>
           <form action="">
            <label for="fname"><span>Name <span class="required-star">*</span></span></label>
            <input type="text" id="fname" name="fname" placeholder="Enter your name.. " /><br /><br />

            <label for="email"><span>Email <span class="required-star">*</span></span></label>
            <input type="text" id="email" name="email" placeholder="Enter your email adddress.. "/><br /><br />

            <label for="subject"><span>Message</span></label>
            <textarea name="message" id="message" cols="30" rows="10"></textarea>

            <button className="button-54" type="submit" value="Submit">Submit</button>
          </form>   
        </section>
      </>
    );
}
