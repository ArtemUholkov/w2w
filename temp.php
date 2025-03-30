<?php
/**
 * My Account Dashboard
 *
 * Shows the first intro screen on the account dashboard.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/dashboard.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

$allowed_html = array(
    'a' => array(
        'href' => array(),
    ),
);
?>

    <p>
        <?php
        printf(
        /* translators: 1: user display name 2: logout url */
            wp_kses( __( 'Hello %1$s (not %1$s? <a href="%2$s">Log out</a>)', 'woocommerce' ), $allowed_html ),
            '<strong>' . esc_html( $current_user->display_name ) . '</strong>',
            esc_url( wc_logout_url() )
        );
        ?>
    </p>
<?php
$user_id = get_current_user_id();
$membership_start_date = get_user_meta( $user_id, 'membership_start_date', true );
$membership_level = get_user_meta($user_id, 'membership_level', true);
if ( $membership_level != '' && $membership_start_date != '' && $membership_start_date == date('Y-m-d') ) {
    ?>
    <section class="val_dash" style="border:1px solid #CCCCCC; border-radius:10px; background-color:#FAFAFA;text-align:center;">
        <div class="val_dash_wrapper">
            <h3>
                &#127881; Congratulations! &#127881; Your VIP membership has been upgraded to <span class="val_dash_title_accent"><u><?php echo esc_html( $membership_level ); ?></u></span>.
            </h3>
            <h4>
                <a href="/my-account/points">Click here</a> to learn more about your new VIP membership benefits.
            </h4>
        </div>
    </section>
    <?php
}
?>

    <section class="valhalla-program">
        <div class="val_dash_title_wrapper">
            <p class="h2 text-center"><strong>Valhalla Vitality Program</strong></p>
        </div>
        <div class="val_dash_blocks_wrapper">
            <div class="val_dash_block_item">
                <p class="val_dash_block_title">Wellness Plan Generator</p>
                <div class="val_dash_block_inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="73" fill="none"><path stroke="#6EAFD0" stroke-width="3" d="m14.628 49.412 1.06 1.057 1.059-1.057.166-.166a7.166 7.166 0 0 1 5.055-2.085c1.886 0 3.694.743 5.033 2.064a7.988 7.988 0 0 1 2.11 5.634v.086a7.986 7.986 0 0 1-2.13 5.666l-.023.025-.022.025c-2.87 3.388-5.305 5.908-7.286 7.567-.99.83-1.834 1.416-2.534 1.79-.715.38-1.176.482-1.429.482-.252 0-.712-.1-1.429-.484-.7-.375-1.548-.966-2.547-1.804-1.998-1.678-4.466-4.233-7.402-7.692l-.005-.006a8.608 8.608 0 0 1 .08-11.3 7.166 7.166 0 0 1 5.023-2.053c1.895 0 3.713.75 5.054 2.084l.167.167Z"/><path stroke="#4A9BC4" stroke-width="3" d="m30.799 45.525-.017-.018-.017-.017a12.471 12.471 0 0 0-15.069-1.931 13.36 13.36 0 0 0-.409-.23V9.635a5.395 5.395 0 0 1 1.587-3.802A5.431 5.431 0 0 1 20.69 4.25h41.405a5.431 5.431 0 0 1 3.817 1.584A5.395 5.395 0 0 1 67.5 9.636V64.7a5.395 5.395 0 0 1-1.587 3.802 5.431 5.431 0 0 1-3.817 1.584H25.463a61.566 61.566 0 0 0 5.375-5.843 13.21 13.21 0 0 0 3.567-9.34 13.25 13.25 0 0 0-3.607-9.38Zm27.084-1.863-1.06 1.062 1.06-1.062a3.804 3.804 0 0 0-2.686-1.11H36.792a3.804 3.804 0 0 0-2.686 1.11l1.06 1.062-1.06-1.062a3.792 3.792 0 0 0 2.686 6.48h18.405a3.804 3.804 0 0 0 2.686-1.11 3.791 3.791 0 0 0 0-5.37ZM24.84 36.69l.832-1.248-.832 1.248a4.958 4.958 0 0 0 6.249-.614 4.937 4.937 0 0 0-1.606-8.062 4.959 4.959 0 0 0-5.393 1.07 4.939 4.939 0 0 0 .75 7.606Zm0-13.767.832-1.248-.832 1.248a4.958 4.958 0 0 0 6.249-.614 4.937 4.937 0 0 0-1.606-8.062 4.959 4.959 0 0 0-5.393 1.07 4.94 4.94 0 0 0-1.074 5.388 4.944 4.944 0 0 0 1.824 2.218Zm11.951 13.452h18.405a3.804 3.804 0 0 0 2.686-1.11 3.791 3.791 0 0 0 0-5.37 3.804 3.804 0 0 0-2.686-1.11H36.792a3.804 3.804 0 0 0-2.686 1.11 3.792 3.792 0 0 0 2.686 6.48Zm0-13.768h18.405a3.804 3.804 0 0 0 2.686-1.11 3.791 3.791 0 0 0 0-5.369 3.804 3.804 0 0 0-2.686-1.11H36.792a3.804 3.804 0 0 0-2.686 1.11 3.792 3.792 0 0 0 2.686 6.48Z"/></svg>
                    <a
                        href="/wellness-plan-generator/"
                        class="val_dash_block_button"
                    >Open</a>
                </div>
            </div>
            <div class="val_dash_block_item">
                <p class="val_dash_block_title">Medical intake form</p>
                <div class="val_dash_block_inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" fill="none"><path fill="#4A9BC4" fill-rule="evenodd" d="M18.36 10.52c0-2.746 2.265-5.01 5.01-5.01H43.4c2.745 0 5.01 2.264 5.01 5.01v1.665h8.346c2.745 0 5.008 2.263 5.008 5.008v9.612a1.671 1.671 0 0 1-2.314 1.563 1.67 1.67 0 0 1-1.025-1.563v-9.612c0-.954-.715-1.67-1.669-1.67h-46.74c-.954 0-1.67.716-1.67 1.67v6.677a1.67 1.67 0 1 1-3.338 0v-6.677c0-2.745 2.262-5.008 5.008-5.008h8.345V10.52ZM43.4 8.847H23.37c-.954 0-1.67.718-1.67 1.671v1.666h23.37V10.52c0-.953-.716-1.67-1.67-1.67ZM12.174 19.351a1.67 1.67 0 0 1 1.18-.488h40.063a1.67 1.67 0 0 1 1.67 1.669v12.95a1.67 1.67 0 1 1-3.339 0V22.2H15.024v43.402h36.724v-4.617a1.67 1.67 0 1 1 3.339 0v6.286a1.669 1.669 0 0 1-1.67 1.67H13.354a1.67 1.67 0 0 1-1.669-1.67v-46.74c0-.443.176-.867.49-1.18ZM5.497 29.367a1.67 1.67 0 1 1 2.36 2.361 1.67 1.67 0 0 1-2.36-2.36Zm16.693 0a1.67 1.67 0 1 1 2.36 2.362 1.67 1.67 0 0 1-2.36-2.362Zm5.54-.37a1.67 1.67 0 0 1 .65-.117H43.4a1.67 1.67 0 0 1 0 3.338H28.38a1.67 1.67 0 0 1-.65-3.222Zm-.531 5.38a1.67 1.67 0 0 1 1.18-.49h8.349a1.67 1.67 0 0 1 0 3.34H28.38a1.67 1.67 0 0 1-1.181-2.85ZM5.48 36.038a1.669 1.669 0 0 1 2.867 1.187V70.61c0 .953.715 1.669 1.669 1.669h46.74c.954 0 1.67-.716 1.67-1.67V54.32a1.669 1.669 0 1 1 3.338 0v16.29c0 2.746-2.263 5.008-5.008 5.008h-46.74c-2.746 0-5.008-2.262-5.008-5.007V37.224a1.67 1.67 0 0 1 .472-1.187ZM27.2 41.05a1.67 1.67 0 0 1 1.18-.489H43.4a1.67 1.67 0 0 1 0 3.34H28.38a1.67 1.67 0 0 1-1.181-2.85Zm-5.01.003a1.67 1.67 0 1 1 2.361 2.36 1.67 1.67 0 0 1-2.36-2.36Zm5.01 5.007a1.67 1.67 0 0 1 1.18-.49h8.349a1.67 1.67 0 0 1 0 3.34H28.38a1.67 1.67 0 0 1-1.181-2.85Z" clip-rule="evenodd"/><path fill="#6EAFD0" fill-rule="evenodd" d="M66.746 25.54a1.67 1.67 0 0 0-1.153.487l-23.37 23.368a1.668 1.668 0 0 0-.406.654l-3.34 10.018a1.67 1.67 0 0 0 2.114 2.114l10.018-3.34a1.67 1.67 0 0 0 .653-.406l23.369-23.37a1.67 1.67 0 0 0 0-2.36l-6.679-6.678a1.668 1.668 0 0 0-1.206-.487Zm4.342 8.348-4.318-4.319-2.646 2.646 4.319 4.318 2.645-2.645Zm-5.006 5.006-4.318-4.318-16 16 4.318 4.318 16-16ZM46.988 56.528 44.13 53.67l-1.433 4.29 4.291-1.432Z" clip-rule="evenodd"/></svg>
                    <a
                        href="/medical-intake-form/"
                        class="val_dash_block_button"
                    >Open</a
                    >
                </div>
            </div>
            <div class="val_dash_block_item">
                <p class="val_dash_block_title">Book consultation</p>
                <div class="val_dash_block_inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" fill="none"><g clip-path="url(#a)"><path fill="#6EAFD0" d="M21.333 21.834h5.333v5.333a2.667 2.667 0 0 0 2.667 2.667h2.666a2.667 2.667 0 0 0 2.667-2.667v-5.333h5.333a2.667 2.667 0 0 0 2.667-2.667v-2.666a2.667 2.667 0 0 0-2.667-2.667h-5.333V8.501a2.667 2.667 0 0 0-2.667-2.667h-2.666a2.667 2.667 0 0 0-2.667 2.667v5.333h-5.333a2.667 2.667 0 0 0-2.667 2.667v2.666a2.667 2.667 0 0 0 2.667 2.667Zm0-5.333h5.333a2.667 2.667 0 0 0 2.667-2.667V8.501h2.666v5.333a2.667 2.667 0 0 0 2.667 2.667h5.333v2.666h-5.333a2.667 2.667 0 0 0-2.667 2.667v5.333h-2.666v-5.333a2.667 2.667 0 0 0-2.667-2.667h-5.333v-2.666Z"/><path fill="#4A9BC4" d="M74.667 24.5H61.333V5.833A5.333 5.333 0 0 0 56 .5H5.333A5.333 5.333 0 0 0 0 5.833v34.842a5.164 5.164 0 0 0 5.159 5.158h1.508c.736 0 1.333.597 1.333 1.334v6.666c0 .993.553 1.904 1.435 2.36a2.65 2.65 0 0 0 2.752-.17l6.48-4.486V64.5A5.333 5.333 0 0 0 24 69.833h28.68c.269 0 .531.085.748.244l14.383 9.944A2.666 2.666 0 0 0 72 77.833v-6.666c0-.737.597-1.334 1.333-1.334h1.334A5.333 5.333 0 0 0 80 64.5V29.833a5.333 5.333 0 0 0-5.333-5.333Zm-64 29.333v-6.666a4 4 0 0 0-4-4H5.159a2.496 2.496 0 0 1-2.492-2.492V5.833a2.667 2.667 0 0 1 2.666-2.666H56a2.667 2.667 0 0 1 2.667 2.666V40.5A2.667 2.667 0 0 1 56 43.167H27.325a4 4 0 0 0-2.277.71l-14.381 9.956ZM77.333 64.5a2.667 2.667 0 0 1-2.666 2.667h-1.334a4 4 0 0 0-4 4v6.666l-14.361-9.93a3.922 3.922 0 0 0-2.292-.736H24a2.667 2.667 0 0 1-2.667-2.667V49.692l5.232-3.621c.224-.155.489-.238.76-.238H56a5.333 5.333 0 0 0 5.333-5.333V27.167h13.334a2.667 2.667 0 0 1 2.666 2.666V64.5Z"/><path fill="#4A9BC4" d="M41.333 33.833c0 .737.597 1.334 1.333 1.334h8a1.333 1.333 0 0 0 0-2.667h-8c-.736 0-1.333.597-1.333 1.333ZM10.666 35.167h26.667a1.333 1.333 0 0 0 0-2.667H10.666a1.333 1.333 0 0 0 0 2.667ZM30.667 37.834h-1.334a1.333 1.333 0 0 0 0 2.667h1.334a1.333 1.333 0 0 0 0-2.667ZM24 37.834H10.668a1.333 1.333 0 1 0 0 2.667h13.334a1.333 1.333 0 0 0 0-2.667Z"/><path fill="#6EAFD0" d="M69.333 55.166h-8a1.333 1.333 0 0 0 0 2.667h8a1.333 1.333 0 0 0 0-2.667Z"/><path fill="#4A9BC4" d="M56 55.166H29.333a1.333 1.333 0 0 0 0 2.667H56a1.333 1.333 0 0 0 0-2.667Z"/><path fill="#6EAFD0" d="M49.334 60.5H48a1.333 1.333 0 0 0 0 2.667h1.334a1.333 1.333 0 0 0 0-2.667Z"/><path fill="#4A9BC4" d="M42.667 60.5H29.333a1.333 1.333 0 0 0 0 2.667h13.334a1.333 1.333 0 0 0 0-2.667Z"/><path fill="#6EAFD0" d="M48 52.5h1.333a1.333 1.333 0 0 0 0-2.666h-1.334a1.333 1.333 0 0 0 0 2.667Z"/><path fill="#4A9BC4" d="M29.333 52.5h13.334a1.333 1.333 0 0 0 0-2.666H29.333a1.333 1.333 0 0 0 0 2.667ZM69.334 49.834H54.667a1.333 1.333 0 1 0 0 2.667h14.667a1.333 1.333 0 0 0 0-2.667Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 .5h80v80H0z"/></clipPath></defs></svg>
                    <a
                        href="/medical-intake-form/"
                        class="val_dash_block_button"
                    >Book</a>
                </div>
            </div>
        </div>
    </section>

<?php $user_id = get_current_user_id(); $membership_level = !empty(get_user_meta($user_id, 'membership_level', true)) ? get_user_meta($user_id, 'membership_level', true) : ''; ?>
<?php
$membership_data = array(
    "Bronze Tier" => array(
        "image" => 'vip_bronze.png',
        "discount" => '1%'
    ),
    "Silver Tier" => array(
        "image" => 'vip_silver.png',
        "discount" => '2%'
    ),
    "Gold Tier" => array(
        "image" => 'vip_gold.png',
        "discount" => '5%'
    ),
    "Platinum Tier" => array(
        "image" => 'vip_plat.png',
        "discount" => '10%'
    )
);

    if ($membership_level && isset($membership_data[$membership_level])):
        $data = $membership_data[$membership_level];
    ?>
    <section class="val_dash">
        <p class="h2 text-center"><strong>Membership Details</strong></p>
        <div class="viprewards">
            <h4>Your <span class="val_dash_title_accent">Valhalla VIP Rewards</span> Membership</h4>
            <div class="val_dash_discount_info">
                <h5><?php echo $membership_level; ?></h5>
                <img src="/wp-content/uploads/2024/03/<?php echo $data['image']; ?>" alt="<?php echo $membership_level; ?> Badge">
                <p>Discount: <?php echo $data['discount']; ?></p>
            </div>
            <div class="viprewards_info">
                <p>You've earned the <?php echo $membership_level; ?> VIP Rewards membership. Now you will get automatic discounts on all purchases for an entire year!</p>
                <a href="/my-account/points">Learn More</a>
            </div>
            <div style="clear:both"></div>
        </div>
    </section>
<?php endif; ?>
    <section class="val_dash">
        <div class="val_dash_wrapper">
            <?php
            global $wpdb;
            $query = "
        					SELECT COUNT(*)
        					FROM {$wpdb->prefix}posts AS p
        					WHERE p.post_type = 'shop_order'
          					AND p.post_status NOT IN ('trash', 'auto-draft') -- Exclude unwanted statuses
          					AND EXISTS (
              SELECT 1
              FROM {$wpdb->prefix}postmeta AS pm
              WHERE pm.post_id = p.ID
                AND pm.meta_key = '_customer_user'
                AND pm.meta_value = %d
          )
    ";
            $order_count = $wpdb->get_var($wpdb->prepare($query, $user_id));
            ?>
            <?php if($order_count > 0): ?>
                <style>
                    /* Modal styles */
                    .ratingmodal {
                        display: none; /* Hidden by default */
                        position: fixed;
                        z-index: 1000;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        background-color: rgba(0, 0, 0, 0.5); /* Black with opacity */
                    }

                    .modal-content {
                        background-color: #fff;
                        margin: 10% auto; /* 10% from the top and centered */
                        padding: 20px;
                        border-radius: 8px;
                        width: 80%;
                        max-width: 500px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    }

                    .modal-header {
                        font-size: 1.5em;
                        margin-bottom: 10px;
                    }

                    .modal-body {
                        font-size: 1em;
                        margin-bottom: 20px;
                    }

                    .close {
                        color: #aaa;
                        float: right;
                        font-size: 28px;
                        font-weight: bold;
                        cursor: pointer;
                    }

                    .close:hover,
                    .close:focus {
                        color: #000;
                        text-decoration: none;
                    }
                </style>
                <div class="val_dash_title_wrapper">
                    <a id="open_modal" href="/provider-rating.php" target="_blank" style="color:ffbf37; font-weight:bold;"><span style="color:#000">Please tell us how we're doing.</span> - Rate your experience </a>
                </div>

                <div id="ratingmodal" class="ratingmodal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <div class="modal-body">
                            <iframe id="modal-iframe" src="" style="width: 100%; height: 500px; border: none;"></iframe>
                        </div>
                    </div>
                </div>
                <script>
                    // Wait for the DOM to load
                    document.addEventListener('DOMContentLoaded', function () {
                        // Get modal elements
                        var modal = document.getElementById('ratingmodal');
                        var iframe = document.getElementById('modal-iframe');
                        var closeBtn = document.querySelector('.close');
                        var triggerLink = document.getElementById('open_modal');

                        // Open modal when the link is clicked
                        triggerLink.addEventListener('click', function (event) {
                            event.preventDefault(); // Prevent default link behavior
                            var href = this.getAttribute('href'); // Get the link's href attribute
                            iframe.src = href; // Set the iframe source to the href
                            modal.style.display = 'block'; // Show the modal
                        });

                        // Close modal when the close button is clicked
                        closeBtn.addEventListener('click', function () {
                            modal.style.display = 'none'; // Hide the modal
                            iframe.src = ''; // Clear the iframe source for security
                        });

                        // Close modal when clicking outside the modal content
                        window.addEventListener('click', function (event) {
                            if (event.target === modal) {
                                modal.style.display = 'none'; // Hide the modal
                                iframe.src = ''; // Clear the iframe source for security
                            }
                        });
                    });
                </script>
            <?php endif; ?>
        </div>
    </section>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;500;700&display=swap');
        .val_dash {
            width: 100%;
            max-width: 1047px;
            margin: 0 auto;
        }
        .val_dash_wrapper {
            padding: 25px 90px 20px 70px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;
        }
        .val_dash_title_wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .val_dash_title {
            color: #010101;
            text-align: center;
            font-family: 'Work Sans';
            font-size: 22px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: uppercase;
        }
        .val_dash_title_accent {
            color: #ffbf37;
        }
        .val_dash_blocks_wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 100px;
        }
        .val_dash_block {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: center;
        }
        .val_dash_block_title {
            color: #010101;
            text-align: center;
            font-family: 'Work Sans';
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: uppercase;
        }
        .val_dash_block_img {
            height: 180px;
            width: 180px;
            border-radius: 20px;
            background: #fff;

            box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.1), 2px 6px 7px 0px rgba(0, 0, 0, 0.09),
            5px 14px 9px 0px rgba(0, 0, 0, 0.05), 9px 25px 11px 0px rgba(0, 0, 0, 0.01),
            14px 39px 12px 0px rgba(0, 0, 0, 0);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
        }

        .val_fst_img {
            background-image: url('https://i.ibb.co/s69kMrD/blood.png');
            background-position: center center;
            background-size: cover;
        }
        .val_snd_img {
            background: url('https://i.ibb.co/QJTbtB3/form.png');
            background-position: center center;
            background-size: cover;
        }
        .woocommerce-MyAccount-content .val_dash_block_button {
            margin-bottom: 8px;
            padding: 10px 42px;
            border-radius: 30px;
            background-color: #fff;
            border: 1px solid #000;
            font-size: 16px;
            line-height: normal;
            font-weight: 500;
            text-transform: capitalize;
            color: #221F1F;
            transition: all 0.3s;
        }
        .woocommerce-MyAccount-content .val_dash_block_button:hover {
            background-color: #2D2D2D;
            color: #fff;
            transition: all 0.3s;
        }
        .woocommerce-MyAccount-content .val_dash_block_button:active {
            background: rgb(0, 0, 0);
        }
        .val_dash_book {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .val_dash_book_text {
            color: #010101;
            text-align: center;
            font-family: 'Work Sans';
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: uppercase;
        }
        .val_dnone {
            display: none;
        }
        @media (max-width: 1100px) {
            .val_dash_blocks_wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 30px;
            }
        }

        @media (max-width: 768px) {
            .val_dash_wrapper {
                padding: 60px 20px 60px 20px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 60px;
            }
            .val_dash_block_img {
                height: 150px;
                width: 150px;
            }
            .val_dash_title {
                width: 238px;
                font-size: 22px;
            }
            .val_dash_block_title {
                font-size: 16px;
            }
            .val_dnone {
                display: block;
            }
            .val_dshow {
                display: none;
            }
            .val_dash_book_text {
                font-size: 16px;
            }
            .val_dash_block_button {
                font-size: 14px;
                padding: 8px 30px;
            }
        }
    </style>

<?php
/**
 * My Account dashboard.
 *
 * @since 2.6.0
 */
do_action( 'woocommerce_account_dashboard' );

/**
 * Deprecated woocommerce_before_my_account action.
 *
 * @deprecated 2.6.0
 */
do_action( 'woocommerce_before_my_account' );

/**
 * Deprecated woocommerce_after_my_account action.
 *
 * @deprecated 2.6.0
 */
do_action( 'woocommerce_after_my_account' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
